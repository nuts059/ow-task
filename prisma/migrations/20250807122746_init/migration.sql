-- CreateTable
CREATE TABLE "TUser" (
    "user_id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,

    CONSTRAINT "TUser_pkey" PRIMARY KEY ("user_id")
);

-- CreateTable
CREATE TABLE "TTask" (
    "task_id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "role_id" INTEGER NOT NULL,
    "char_id" INTEGER NOT NULL,
    "create_date" TIMESTAMP(3) NOT NULL,
    "status_code" INTEGER NOT NULL,
    "comment" TEXT NOT NULL,

    CONSTRAINT "TTask_pkey" PRIMARY KEY ("task_id")
);

-- CreateTable
CREATE TABLE "MRole" (
    "role_id" INTEGER NOT NULL,
    "role_name" TEXT NOT NULL,

    CONSTRAINT "MRole_pkey" PRIMARY KEY ("role_id")
);

-- CreateTable
CREATE TABLE "MChar" (
    "char_id" INTEGER NOT NULL,
    "role_id" INTEGER NOT NULL,
    "char_name" TEXT NOT NULL,

    CONSTRAINT "MChar_pkey" PRIMARY KEY ("char_id")
);

-- CreateTable
CREATE TABLE "MStatus" (
    "status_code" INTEGER NOT NULL,
    "status_name" TEXT NOT NULL,

    CONSTRAINT "MStatus_pkey" PRIMARY KEY ("status_code")
);

-- CreateIndex
CREATE UNIQUE INDEX "TUser_email_key" ON "TUser"("email");

-- AddForeignKey
ALTER TABLE "TTask" ADD CONSTRAINT "TTask_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "TUser"("user_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TTask" ADD CONSTRAINT "TTask_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "MRole"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TTask" ADD CONSTRAINT "TTask_char_id_fkey" FOREIGN KEY ("char_id") REFERENCES "MChar"("char_id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TTask" ADD CONSTRAINT "TTask_status_code_fkey" FOREIGN KEY ("status_code") REFERENCES "MStatus"("status_code") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MChar" ADD CONSTRAINT "MChar_role_id_fkey" FOREIGN KEY ("role_id") REFERENCES "MRole"("role_id") ON DELETE CASCADE ON UPDATE CASCADE;
