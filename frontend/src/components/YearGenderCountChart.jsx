import React, { useRef, useEffect } from 'react';
// import { LineChart } from '@mui/x-charts/LineChart';
import { LineChartPro as LineChart } from '@mui/x-charts-pro/LineChartPro';
import { betterFetch } from '@better-fetch/fetch';
import { useAppState } from '../AppStateContext';

export default function YearGenderCountChart() {
    const [dataLoaded, setDataLoaded] = React.useState([]);
    const hasFetched = useRef(false);

    const {
        selectedState,
        selectedStateMinYear,
        selectedStateMaxYear
    } = useAppState();

    const series = [
        {
            label: 'Male',
            data: dataLoaded.map((v) => v.maleCount),
        },
        {
            label: 'Female',
            data: dataLoaded.map((v) => v.femaleCount),
        },
    ];

    useEffect(() => {
        // if (hasFetched.current) return;

        if (selectedStateMinYear === null || selectedStateMaxYear === null || selectedState === null)
            return;

        hasFetched.current = true;
        betterFetch(`${window.location.origin}/api/BabyNames/year-gender-counts?minYear=${selectedStateMinYear}&maxYear=${selectedStateMaxYear}&stateCode=${selectedState?.StateCode}`).then(({ data, error }) => {
            setDataLoaded(data.map((item, index) => ({
                year: item.year,
                maleCount: item.maleCount,
                femaleCount: item.femaleCount
            })));
        });

    }, [selectedStateMinYear, selectedStateMaxYear, selectedState]);

    return (
        <LineChart
            height={300}
            width={1600}
            xAxis={[
                {
                    zoom: true,
                    scaleType: 'point',
                    data: dataLoaded.map((v, i) => v.year),
                    label: 'Year'
                },
            ]}
            yAxis={[
                {
                    scaleType: 'linear',
                    label: 'Count',
                },
            ]}
            series={series}
        />
    );
}
