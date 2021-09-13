import { Service } from 'typedi';
import { GetHoustingReportUseCase } from '../../../application/ports/in/get-housting-report-use-case';
import { GetHoustingReportService } from './../../../application/services/get-housting-report.service';
import { Request, Response } from 'express';

@Service()
export class HoustingReportController {
  private getHoustingReportUseCase: GetHoustingReportUseCase;

  constructor(getHoustingReportService: GetHoustingReportService) {
    this.getHoustingReportUseCase = getHoustingReportService;
  }
  getHoustingReport = async (req: Request, res: Response) => {
    const { cashId, houstingId } = req.params;

    const houstingReport = await this.getHoustingReportUseCase.getTheHoustingReport(
      parseInt(cashId),
      parseInt(houstingId),
    );

    res.json(houstingReport);
  };
}
