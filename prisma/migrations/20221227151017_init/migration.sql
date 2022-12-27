-- CreateTable
CREATE TABLE "Link" (
    "id" SERIAL NOT NULL,
    "alias" VARCHAR(15) NOT NULL,
    "original" TEXT NOT NULL,
    "public" BOOLEAN NOT NULL,

    CONSTRAINT "Link_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Link_alias_key" ON "Link"("alias");
