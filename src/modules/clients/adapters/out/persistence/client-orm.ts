import { Service } from 'typedi';
import { IQueries } from '../../../../../shared/interfaces/query.interface';
import { DataClient } from '../../../application/services/data-client';
import { ClientDatabaseEntity } from './client-database-entity';
import { ClientRepository } from './client-repository';
import { Op, Sequelize as seq } from 'sequelize';

@Service()
export class ClientORM implements ClientRepository {
    async createClient(hotelId: number, dataClient: DataClient): Promise<any> {
        try {
            const client: ClientDatabaseEntity = new ClientDatabaseEntity();
            client.names = dataClient.names;
            client.surnames = dataClient.surnames;
            client.dni = dataClient.dni;
            client.cellphone = dataClient.cellphone;
            client.visitReason = dataClient.visitReason;
            client.hotelId = hotelId;
            await client.save();

            return client;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getClient(clientId: number): Promise<any> {
        try {
            const client = await ClientDatabaseEntity.findByPk(clientId);
            return client;
        } catch (error) {
            console.log('------------', error);
        }
    }
    async getClients(hotelId: number, queries: IQueries): Promise<any> {
        try {
            const clients = await ClientDatabaseEntity.findAndCountAll({
                where: {
                    hotelId,
                    [Op.or]: [
                        {
                            dni: seq.where(
                                seq.fn('LOWER', seq.col('dni')),
                                'LIKE',
                                '%' + queries.searchText?.toLowerCase() + '%',
                            ),
                        },
                        {
                            names: seq.where(
                                seq.fn('LOWER', seq.col('names')),
                                'LIKE',
                                '%' + queries.searchText?.toLowerCase() + '%',
                            ),
                        },
                        {
                            surnames: seq.where(
                                seq.fn('LOWER', seq.col('surnames')),
                                'LIKE',
                                '%' + queries.searchText?.toLowerCase() + '%',
                            ),
                        },
                    ],
                },
                order: [['id', 'DESC']],
                limit: queries.limit,
                offset: queries.offset,
            });
            return clients;
        } catch (error) {
            console.log('------------', error);
        }
    }

    /* 
$or: [
                        {
                            names: seq.where(
                                seq.fn('LOWER', seq.col('names')),
                                'LIKE',
                                '%' + queries.searchText?.toLowerCase() + '%',
                            ),
                        },
                        {
                            surnames: seq.where(
                                seq.fn('LOWER', seq.col('surnames')),
                                'LIKE',
                                '%' + queries.searchText?.toLowerCase() + '%',
                            ),
                        },
                    ],
                    names: seq.where(
                        seq.fn('LOWER', seq.col('names')),
                        'LIKE',
                        '%' + queries.searchText?.toLowerCase() + '%',
                    ),
                    surnames: seq.where(
                        seq.fn('LOWER', seq.col('surnames')),
                        'LIKE',
                        '%' + queries.searchText?.toLowerCase() + '%',
                    ),


*/

    async updateClient(clientId: number, dataClient: DataClient): Promise<any> {
        try {
            const client: any = await ClientDatabaseEntity.findByPk(clientId);
            client.names = dataClient.names;
            client.surnames = dataClient.surnames;
            client.dni = dataClient.dni;
            client.cellphone = dataClient.cellphone;
            client.visitReason = dataClient.visitReason;
            await client.save();

            return client;
        } catch (error) {
            console.log('------------', error);
        }
    }
}
