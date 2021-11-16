import { Service } from 'typedi';
import { GetHoustingReportUseCase } from '../../../application/ports/in/get-housting-report-use-case';
import { GetHoustingReportService } from '../../../application/services/get-housting-report.service';
import { Request, Response } from 'express';
import { GetHoustingReportsService } from '../../../application/services/get-housting-reports.service';
import { IGetHoustingReportsUseCase } from '../../../application/ports/in/get-housting-reports-use-case';

@Service()
export class HoustingReportController {
    private getHoustingReportUseCase: GetHoustingReportUseCase;
    private getHoustingReportsUseCase: IGetHoustingReportsUseCase;

    constructor(
        getHoustingReportService: GetHoustingReportService,
        getHoustingReportsService: GetHoustingReportsService,
    ) {
        this.getHoustingReportUseCase = getHoustingReportService;
        this.getHoustingReportsUseCase = getHoustingReportsService;
    }
    getHoustingReport = async (req: Request, res: Response) => {
        const { cashId, houstingId } = req.params;

        const houstingReport = await this.getHoustingReportUseCase.getTheHoustingReport(
            parseInt(cashId),
            parseInt(houstingId),
        );

        res.json(houstingReport);
    };

    getHoustingReports = async (req: Request, res: Response) => {
        const { cashId } = req.params;

        const houstingReport = await this.getHoustingReportsUseCase.getTheHoustingReports(parseInt(cashId));

        res.json(houstingReport);
    };
}
