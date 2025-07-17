import type { MChar, MRole, MStatus } from '@/generated/prisma';
import { z } from 'zod';

// OW2単語リスト
const ow2Words = [
	// Roles
	'tank',
	'support',
	'healer',
	'dps',
	'damage',

	// Combat / Gameplay
	'pick',
	'counterpick',
	'ultimate',
	'ult',
	'kill',
	'death',
	'assist',
	'burst',
	'cc',
	'c9',
	'stun',
	'sleep',
	'shield',
	'barrier',
	'bubble',
	'heal',
	'healing',
	'buff',
	'debuff',
	'peel',

	// Map / Objective
	'payload',
	'point',
	'highground',
	'lowground',
	'choke',
	'spawn',
	'area',
	'zone',
	'push',
	'flank',
	'rotation',
	'corner',

	// Strategy & Communication
	'callout',
	'ping',
	'shotcall',
	'macro',
	'micro',
	'positioning',
	'aggressive',
	'passive',
	'engage',
	'disengage',
	'focus',

	// Evaluation & Meta
	'carry',
	'int',
	'throw',
	'feeder',
	'report',
	'meta',
	'comp',
	'synergy',
	'counter',
	'dive',
	'poke',
	'brawl',

	// Hero names (Tank)
	'reinhardt',
	'winston',
	'dva',
	'zarya',
	'sigma',
	'orisa',
	'roadhog',
	'ramattra',
	'junkerqueen',
	'mauga',
	'warlord',

	// Hero names (Support)
	'ana',
	'baptiste',
	'zenyatta',
	'lucio',
	'mercy',
	'brigitte',
	'kiriko',
	'lifeweaver',
	'illari',
	'venture',

	// Hero names (DPS)
	'genji',
	'hanzo',
	'soldier',
	'cassidy',
	'ashe',
	'echo',
	'pharah',
	'reaper',
	'tracer',
	'symmetra',
	'mei',
	'junkrat',
	'bastion',
	'torbjorn',
	'sombra',
	'widowmaker',
	'sojourn',
	'venture',
];

// 正規表現：8文字以上、英大文字・小文字・数字・記号を1つ以上含む
export const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;

export const validatePrase = z.object({
	email: z.string().email({ message: 'メールを登録してください' }),
	password: z
		.string()
		.regex(passwordRegex, {
			message: 'パスワードは8文字以上で、英大文字・小文字・数字・記号をすべて含めてください',
		})
		.refine((val) => ow2Words.some((word) => val.includes(word)), {
			message: `パスワードには以下のOW2用語のいずれかを含めてください: ${ow2Words.join('、')}`,
		}),
});

export const TaskValidate = (role: MRole[], char: MChar[], status: MStatus[]) => {
	const validateTaskPrase = z.object({
		title: z
			.string()
			.min(1, { message: 'タイトルを入力してください' })
			.max(50, { message: 'タイトル長ｽｷﾞｨ！' }),
		// ロールのバリデーション
		role: z.number().refine(
			(val) => {
				// ロールがマスタに登録されているか
				// マスタのidを取ってくる
				const roleMaster = role.map((rr) => rr.role_id);
				// 上とvalueを見比べる
				if (roleMaster.includes(val)) {
					return true;
				} else {
					return false;
				}
			},
			{ message: 'ロールidが一致していません' }
		),
		// キャラのバリデーション
		char: z.number().refine(
			(val) => {
				// キャラがマスタに登録されているか
				// マスタのidを取ってくる
				const charMaster = char.map((cr) => cr.char_id);
				// 上とvalueを見比べる
				if (charMaster.includes(val)) {
					return true;
				} else {
					return false;
				}
			},
			{ message: 'キャラidが一致していません' }
		),
		status: z.number().refine(
			(val) => {
				const statusMaster = status.map((sr) => sr.status_code);
				if (statusMaster.includes(val)) {
					return true;
				} else {
					return false;
				}
			},
			{ message: 'ステータスidが一致していません' }
		),
		comment: z.string().max(500, { message: 'コメント長ｽｷﾞｨ！' }),
	});
	return validateTaskPrase;
};
