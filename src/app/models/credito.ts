export interface ICredito {
    $key?: string
    idCliente: string;
    companyName: string;
    companyNIT: string;
    salary: number;
    approvedAmount: number;
    startDate?: Date;
}