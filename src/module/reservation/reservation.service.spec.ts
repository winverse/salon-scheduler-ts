import { Test, TestingModule } from "@nestjs/testing";
import { ReservationService } from "./reservation.service";
import { PrismaService } from "@provider/prisma/prisma.service";
import { stubPrismaService, stubUtilsService } from "test/stub/provider";
import { UtilsService } from "@provider/utils/utils.service";

describe("ReservationService", () => {
  let reservationService: ReservationService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ReservationService,
        {
          provide: PrismaService,
          useValue: stubPrismaService,
        },
        {
          provide: UtilsService,
          useValue: stubUtilsService,
        },
      ],
    }).compile();

    reservationService = module.get<ReservationService>(ReservationService);
  });

  it("should be defined", () => {
    expect(reservationService).toBeDefined();
  });
});
