import { Service } from 'typedi';
import { Request, Response } from 'express';
import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';

import { CreateHoustingService } from '../../../application/services/create-housting.service';
import { CreateHoustingRequest } from '../../../application/ports/in/create-housting.request';
import { DataHousting } from '../../../application/services/data-housting';
import { GetHoustingRequest } from '../../../application/ports/in/get-housting-request';
import { GetHoustingService } from '../../../application/services/get-housting.service';
import { HoustingCommand } from '../../../application/ports/in/housting.command';
import { UpdateMoneyPaidService } from '../../../application/services/update-money-paid.service';
import { UpdateMoneyPaidUseCase } from '../../../application/ports/in/update-money-paid-use-case';
import { FinishHoustingUseCase } from '../../../application/ports/in/finish-housting';
import { FinishHoustingService } from '../../../application/services/finish-housting.service';
import { AddMoneyToCashDueHoustingUseCase } from '../../../../cash/application/ports/in/add-money-to-cash-due-housting-use-case';
import { AddMoneyToCashService } from '../../../../cash/application/services/add-money-to-cash-due-housting.service';
import { CreateHoustingReportService } from '../../../../reports/housting-reports/application/services/create-housting-report.service';
import { CreateHoustingReportRequest } from '../../../../reports/housting-reports/application/ports/in/create-housting-report.request';

import { AddMoneyToHoustingReportService } from '../../../../reports/housting-reports/application/services/add-money-to-housting-report.service';
import { AddMoneyToHoustingReportDueHoustingUseCase } from '../../../../reports/housting-reports/application/ports/in/add-money-to-housting-report-due-housting-use-case';
import { IAddMoneyToDailyReportDueHoustingUseCase } from '../../../../reports/daily-reports/application/ports/in/add-money-to-daily-report-due-housting-use-case';
import { AddMoneyToDailyReportDueHoustingService } from '../../../../reports/daily-reports/application/services/add-money-to-daily-report-due-housting.service';

dayjs.extend(utc);

@Service()
export class HoustingController {
    private createHoustingRequest: CreateHoustingRequest;
    private getHoustingRequest: GetHoustingRequest;
    private updateMoneyPaidUseCase: UpdateMoneyPaidUseCase;
    private finishHoustingUseCase: FinishHoustingUseCase;

    //other domains
    private addMoneyToCashDueHoustingUseCase: AddMoneyToCashDueHoustingUseCase;
    private createHoustingReportRequest: CreateHoustingReportRequest;
    private addMoneyToHoustingReportDueHousting: AddMoneyToHoustingReportDueHoustingUseCase;
    private addMoneyToDailyReportDueHousting: IAddMoneyToDailyReportDueHoustingUseCase;

    constructor(
        createHoustingService: CreateHoustingService,
        getHoustingService: GetHoustingService,
        updateMoneyPaidService: UpdateMoneyPaidService,
        finishHoustingService: FinishHoustingService,

        //other domains
        addMoneyToCashService: AddMoneyToCashService,
        createHoustingReportService: CreateHoustingReportService,
        addMoneyToHoustingReportService: AddMoneyToHoustingReportService,
        addMoneyToDailyReportDueHoustingService: AddMoneyToDailyReportDueHoustingService,
    ) {
        this.createHoustingRequest = createHoustingService;
        this.getHoustingRequest = getHoustingService;
        this.updateMoneyPaidUseCase = updateMoneyPaidService;
        this.finishHoustingUseCase = finishHoustingService;

        //other domains
        this.addMoneyToCashDueHoustingUseCase = addMoneyToCashService;
        this.createHoustingReportRequest = createHoustingReportService;
        this.addMoneyToHoustingReportDueHousting = addMoneyToHoustingReportService;
        this.addMoneyToDailyReportDueHousting = addMoneyToDailyReportDueHoustingService;
    }
    createHousting = async (req: Request, res: Response) => {
        const { hotelId, cashId, clientId, roomId } = req.params;
        const { moneyPaid, entryDate, entryTime, discountApplied } = req.body;
        const _hotelId = parseInt(hotelId),
            _cashId = parseInt(cashId);

        const newHousting = await this.createHoustingRequest.createTheHousting(
            parseInt(cashId),
            parseInt(clientId),
            parseInt(roomId),
            new DataHousting(
                0, //price by default 0
                parseInt(moneyPaid),
                entryDate,
                entryTime,
                parseInt(discountApplied),
                //dayjs(new Date()).utc(true).format()
            ),
        );
        this.addMoneyToCashDueHoustingUseCase.addMoneyToCashDueHousting(parseInt(cashId), newHousting.moneyPaid);
        this.createHoustingReportRequest.createHoustingReport(
            parseInt(cashId),
            newHousting.id,
            newHousting.moneyPaid,
        );
        this.addMoneyToDailyReportDueHousting.addMoneyDueHousting(_hotelId, _cashId, newHousting.moneyPaid);
        res.json(newHousting);
    };
    getHoustingByRoom = async (req: Request, res: Response) => {
        const { roomId } = req.params;

        const housting = await this.getHoustingRequest.getTheHoustingByRoom(parseInt(roomId));

        res.json(housting);
    };
    updateMoneyPaid = async (req: Request, res: Response) => {
        const { hotelId, cashId, houstingId } = req.params;
        const { moneyToAdd } = req.body;
        const _hotelId = parseInt(hotelId),
            _cashId = parseInt(cashId);

        const newMoneyPaid = await this.updateMoneyPaidUseCase.updateMoneyPaid(
            parseInt(houstingId),
            parseInt(moneyToAdd),
        );

        this.addMoneyToCashDueHoustingUseCase.addMoneyToCashDueHousting(parseInt(cashId), parseInt(moneyToAdd));
        this.addMoneyToHoustingReportDueHousting.addMoneyToHoustingReportDueHousting(
            parseInt(houstingId),
            parseInt(moneyToAdd),
        );
        this.addMoneyToDailyReportDueHousting.addMoneyDueHousting(_hotelId, _cashId, moneyToAdd);

        res.json(newMoneyPaid);
    };
    finishHousting = async (req: Request, res: Response) => {
        const { houstingId } = req.params;

        const houstingFinished = await this.finishHoustingUseCase.finishHousting(parseInt(houstingId));

        res.json(houstingFinished);
    };
}
