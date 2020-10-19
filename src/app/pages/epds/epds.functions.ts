import {Epd} from '~models/epd.model';

const round = num => Math.round((num + Number.EPSILON) * 100) / 100;

export function calcMaintenance({tariff, address: {area}}: Epd): number {
    const {maintenance: tariffMaintenance} = tariff ?? {};
    return tariffMaintenance ? round(area * tariffMaintenance) : 0;
}

export function calcWaterSupply({waterSupply, prev, tariff}: Epd): number {
    const {waterSupply: prevWaterSupply} = prev ?? {};
    const {waterSupply: tariffWaterSupply} = tariff ?? {};
    return waterSupply && prevWaterSupply && tariffWaterSupply
        ? waterSupply.reduce((result, value, index) => result + round((value - prevWaterSupply[index]) * tariffWaterSupply), 0)
        : 0;
}

export function calcHeatSupply({heatSupply, prev, tariff}: Epd): number {
    const {heatSupply: prevHeatSupply} = prev ?? {};
    const {heatSupply: tariffHeatSupply} = tariff ?? {};
    const own = heatSupply && prevHeatSupply && prevHeatSupply[0] && tariffHeatSupply
        ? round((heatSupply[0] - prevHeatSupply[0]) * tariffHeatSupply)
        : 0;
    const common = heatSupply && heatSupply[1] && tariffHeatSupply
        ? round(heatSupply[1] * tariffHeatSupply)
        : 0;
    return own + common;
}

export function calcPowerSupply({powerSupply, prev, tariff}: Epd): number {
    const {powerSupply: prevPowerSupply} = prev ?? {};
    const {powerSupply: tariffPowerSupply} = tariff ?? {};
    return powerSupply && prevPowerSupply && tariffPowerSupply
        ? powerSupply.reduce((result, value, index) => result + round((value - prevPowerSupply[index]) * tariffPowerSupply[index]), 0)
        : 0;
}

export function calcPowerSupplyCommon({powerSupplyCommon, tariff}: Epd): number {
    const {powerSupply: tariffPowerSupply} = tariff ?? {};
    return powerSupplyCommon && tariffPowerSupply
        ? powerSupplyCommon.reduce((result, value, index) => result + round(value * tariffPowerSupply[index]), 0)
        : 0;
}

export function calcOtherPayments({otherPayments = []}: Epd): number {
    return otherPayments.reduce((result, value) => result + value, 0);
}

export function calcTotal(epd: Epd): number {
    return calcMaintenance(epd) + calcWaterSupply(epd) + calcHeatSupply(epd) + calcPowerSupply(epd) + calcPowerSupplyCommon(epd)
        + calcOtherPayments(epd);
}
