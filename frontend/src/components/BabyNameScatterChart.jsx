import React, { useEffect, useRef } from 'react';
import { ScatterChart, Scatter, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Card, CardContent, Typography, Box } from '@mui/material';
import { betterFetch } from '@better-fetch/fetch';

const BabyNameScatterChart = () => {

    const [dataLoaded, setDataLoaded] = React.useState(false);
    const hasFetched = useRef(false);

    useEffect(() => {
        if (hasFetched.current) return;
        hasFetched.current = true;

        betterFetch(`${window.location.origin}/api/BabyNames/first-thousand`).then(({ data, error }) => {
            setDataLoaded(data.slice(0, 100).map((item, index) => ({
                x: index,
                y: item.nameCount,
                name: item.firstName
            })));
        });
    }, []);

    return (
        <Box sx={{ width: '90%', padding: 2 }}>
            <Card elevation={3}>
                <CardContent>
                    <Box sx={{ height: 400, width: '100%' }}>
                        <ResponsiveContainer width="100%" height="100%">
                            <ScatterChart margin={{ top: 20, right: 20, bottom: 20, left: 20 }}>
                                <CartesianGrid />
                                <XAxis
                                    type="number"
                                    dataKey="x"
                                    name="Name Index"
                                    tickFormatter={(val) => dataLoaded[val]?.firstName || val}
                                />
                                <YAxis
                                    type="number"
                                    dataKey="y"
                                    name="Count"
                                    label={{
                                        value: 'Name Count',
                                        angle: -90,
                                        position: 'insideLeft',
                                    }}
                                />
                                <Tooltip
                                    cursor={{ strokeDasharray: '3 3' }}
                                    formatter={(value, name, props) => [`${value}`, props.payload.name]}
                                />
                                <Scatter name="Names" data={dataLoaded} fill="#1976d2" />
                            </ScatterChart>
                        </ResponsiveContainer>
                    </Box>
                </CardContent>
            </Card>
        </Box>
    );
};

export default BabyNameScatterChart;
