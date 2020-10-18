import {Epd} from '~models/epd.model';

export function calcWaterSupply({waterSupply, prev, tariff}: Epd): number {
    const {waterSupply: prevWaterSupply} = prev ?? {};
    const {waterSupply: tariffWaterSupply} = tariff ?? {};
    return waterSupply && prevWaterSupply && tariffWaterSupply
        ? waterSupply.reduce((result, value, index) => result + (value - prevWaterSupply[index]) * tariffWaterSupply, 0)
        : 0;
}

export function calcHeatSupply({heatSupply, prev, tariff, address: {area, totalArea}}: Epd): number {
    const {heatSupply: prevHeatSupply} = prev ?? {};
    const {heatSupply: tariffHeatSupply} = tariff ?? {};
    const rate = index => index === 1 ? area / totalArea : 1;
    return heatSupply && prevHeatSupply && tariffHeatSupply
        ? heatSupply.reduce((result, value, index) => result + (value - prevHeatSupply[index]) * tariffHeatSupply * rate(index), 0)
        : 0;
}

export function calcPowerSupply({powerSupply, prev, tariff}: Epd): number {
    const {powerSupply: prevPowerSupply} = prev ?? {};
    const {powerSupply: tariffPowerSupply} = tariff ?? {};
    return powerSupply && prevPowerSupply && tariffPowerSupply
        ? powerSupply.reduce((result, value, index) => result + (value - prevPowerSupply[index]) * tariffPowerSupply[index], 0)
        : 0;
}

export function calcPowerSupplyCommon({powerSupplyCommon, tariff}: Epd): number {
    const {powerSupply: tariffPowerSupply} = tariff ?? {};
    return powerSupplyCommon && tariffPowerSupply
        ? powerSupplyCommon.reduce((result, value, index) => result + value * tariffPowerSupply[index], 0)
        : 0;
}

export function calcOtherPayments({otherPayments = []}: Epd): number {
    return otherPayments.reduce((result, value) => result + value, 0);
}

export function calcTotal(epd: Epd): number {
    return calcWaterSupply(epd) + calcHeatSupply(epd) + calcPowerSupply(epd) + calcPowerSupplyCommon(epd) + calcOtherPayments(epd);
}
