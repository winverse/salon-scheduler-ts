import { PrismaClient } from "@prisma/client";
import { mockDeep, mockReset, DeepMockProxy } from "jest-mock-extended";

import prisma from "./client";

jest.mock("./client", () => ({
  __esModule: true,
  default: mockDeep<PrismaClient>(),
}));

beforeEach(() => {
  mockReset(stubPrismaService);
});

export type StubPrismaService = DeepMockProxy<PrismaClient>;

export const stubPrismaService =
  prisma as unknown as DeepMockProxy<PrismaClient>;
