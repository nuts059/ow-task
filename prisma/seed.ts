import { PrismaClient } from '../src/generated/prisma/client';
import axios from 'axios';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

const main = async () => {
	// 各テーブルから既存の全レコードを削除
	await prisma.mRole?.deleteMany();
	await prisma.mChar?.deleteMany();
	await prisma.mStatus?.deleteMany();
	await prisma.tUser?.deleteMany();
	await prisma.tTask?.deleteMany();
	// await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'TUser';`;
	// await prisma.$executeRaw`DELETE FROM sqlite_sequence WHERE name = 'TTask';`;

	// ロールデータ
	type Role = {
		key: string; // "tank", "damage", "support" などのキー
		name: string; // 表示名（例: "Tank"）
		icon: string; // アイコンのURL
		description: string; // 説明文
	};

	const response1 = await axios.get('https://overfast-api.tekrop.fr/roles');
	const rolesData: Role[] = response1.data;
	for (let i = 0; i < rolesData.length; i++) {
		const role = rolesData[i];
		await prisma.mRole.create({
			data: { role_id: i + 1, role_name: role['name'] },
		});
	}

	// ヒーローデータ
	const response2 = await axios.get('https://overfast-api.tekrop.fr/heroes');
	const charData = response2.data;
	for (let i = 0; i < charData.length; i++) {
		const char = charData[i];
		const roleId = rolesData.findIndex((role: Role) => role.key === char.role) + 1;

		await prisma.mChar.create({
			data: { char_id: i + 1, role_id: roleId, char_name: char['name'] },
		});
	}

	// ステータス
	const s1 = await prisma.mStatus.create({ data: { status_code: 1, status_name: '未対応' } });
	const s2 = await prisma.mStatus.create({ data: { status_code: 2, status_name: '対応中' } });
	const s3 = await prisma.mStatus.create({ data: { status_code: 3, status_name: '完了' } });

	// ユーザー
	const hashPassword = await bcrypt.hash('1234565', 10);
	const user = await prisma.tUser.create({
		data: { email: 'test@google.com', password: hashPassword },
	});

	// タスク
	const t1 = await prisma.tTask.create({
		data: {
			user_id: user.user_id,
			title: 'テスト',
			role_id: 1,
			char_id: 15,
			create_date: '2000-01-01T00:00:00.000Z',
			status_code: 1,
			comment: 'タンクよわスギィ',
		},
	});
};

main()
	.catch((e) => {
		console.error(e);
		process.exit(1);
	})
	.finally(async () => {
		await prisma.$disconnect();
	});
