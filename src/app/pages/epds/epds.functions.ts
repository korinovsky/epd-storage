import {Epd} from '~models/epd.model';
import {Tariff} from '~models/tariff.model';

export const round = (num: number, decimals = 2) => Math.round((num + Number.EPSILON) * Math.pow(10, decimals)) / Math.pow(10, decimals);

export function calcMaintenance({tariff, address: {area}}: Epd): number {
    const {maintenance: tariffMaintenance} =  tariff ?? {} as Tariff;
    return tariffMaintenance ? round(area * tariffMaintenance) : 0;
}

export function calcWaterSupply({waterSupply, prev, tariff}: Epd, index?: number): number {
    const {waterSupply: prevWaterSupply} = prev ?? {} as Epd;
    const {waterSupply: tariffWaterSupply} =  tariff ?? {} as Tariff;
    return waterSupply && prevWaterSupply && tariffWaterSupply
        ? waterSupply.reduce((result, value, i) =>
            result + ((index === undefined || index === i) ? round((value - prevWaterSupply[i]) * tariffWaterSupply) : 0),
            0
        )
        : 0;
}

export function calcWaterDisposal({waterSupply, prev, tariff}: Epd): number {
    const {waterSupply: prevWaterSupply} = prev ?? {} as Epd;
    const {waterDisposal: tariffWaterDisposal} =  tariff ?? {} as Tariff;
    return waterSupply && prevWaterSupply && tariffWaterDisposal
        ? waterSupply.reduce((result, value, index) => result + round((value - prevWaterSupply[index]) * tariffWaterDisposal), 0)
        : 0;
}

export function calcOwnHeatSupply({heatSupply, prev, tariff}: Epd): number {
    const {heatSupply: prevHeatSupply} = prev ?? {} as Epd;
    const {heatSupply: tariffHeatSupply} =  tariff ?? {} as Tariff;
    return heatSupply && prevHeatSupply && prevHeatSupply[0] && tariffHeatSupply
        ? round((heatSupply[0] - prevHeatSupply[0]) * tariffHeatSupply)
        : 0;
}

export function calcCommonHeatSupply({heatSupply, tariff}: Epd): number {
    const {heatSupply: tariffHeatSupply} =  tariff ?? {} as Tariff;
    return heatSupply && heatSupply[1] && tariffHeatSupply
        ? round(heatSupply[1] * tariffHeatSupply)
        : 0;
}

export function calcWaterHeatSupply({heatSupply, tariff}: Epd): number {
    const {heatSupply: tariffHeatSupply} =  tariff ?? {} as Tariff;
    return heatSupply && heatSupply[2] && tariffHeatSupply
        ? round(heatSupply[2] * tariffHeatSupply)
        : 0;
}

export function calcHeatSupply(epd: Epd): number {
    return calcOwnHeatSupply(epd) + calcCommonHeatSupply(epd);
}

export function calcPowerSupply({powerSupply, prev, tariff}: Epd, index?: number): number {
    const {powerSupply: prevPowerSupply} = prev ?? {} as Epd;
    const {powerSupply: tariffPowerSupply} =  tariff ?? {} as Tariff;
    return powerSupply && prevPowerSupply && tariffPowerSupply
        ? powerSupply.reduce((result, value, i) =>
            result + ((index === undefined || index === i) ? round((value - prevPowerSupply[i]) * tariffPowerSupply[i]) : 0),
            0
        )
        : 0;
}

export function calcPowerSupplyCommon({powerSupplyCommon, tariff}: Epd, index?: number): number {
    const {powerSupply: tariffPowerSupply} =  tariff ?? {} as Tariff;
    return powerSupplyCommon && tariffPowerSupply
        ? powerSupplyCommon.reduce((result, value, i) =>
            result + index === undefined || index === i ? round(value * tariffPowerSupply[i]) : 0,
            0
        )
        : 0;
}

export function calcOtherPayments({otherPayments = []}: Epd): number {
    return otherPayments.reduce((result, value) => result + value, 0);
}

export function calcTotal(epd: Epd): number {
    return calcMaintenance(epd) + calcWaterSupply(epd) + calcWaterDisposal(epd) + calcHeatSupply(epd) + calcWaterHeatSupply(epd)
        + calcPowerSupply(epd) + calcPowerSupplyCommon(epd) + calcOtherPayments(epd);
}
