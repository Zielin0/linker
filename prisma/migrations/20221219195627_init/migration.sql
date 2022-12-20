-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "alias" TEXT NOT NULL,
    "original" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);
