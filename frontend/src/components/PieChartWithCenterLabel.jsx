import * as React from 'react';
import { PieChart } from '@mui/x-charts/PieChart';
import { useDrawingArea } from '@mui/x-charts/hooks';
import { styled } from '@mui/material/styles';
import { Card, Box } from '@mui/material';

const size = {
    width: 300,
    height: 300
};

const StyledText = styled('text')(({ theme }) => ({
    fill: theme.palette.text.primary,
    textAnchor: 'middle',
    dominantBaseline: 'central',
    textWrap: 'wrap',
    fontFamily: 'arial, sans-serif',
    fontSize: 12
}));

function PieCenterLabel({ children }) {
    const { width, height, left, top } = useDrawingArea();
    return (
        <StyledText x={left + width / 2} y={top + height / 2}>
            {children}
        </StyledText>
    );
}

export default function PieChartWithCenterLabel({ data, title }) {
    return (
        <Card shadow={2}>
            <PieChart series={[{ data, innerRadius: 120 }]} {...size}>
                <PieCenterLabel>{title}</PieCenterLabel>
            </PieChart>
        </Card>
    );
}
