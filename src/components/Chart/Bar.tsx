import { View, StyleSheet, Dimensions } from 'react-native';
import React from 'react';
import { BarChart } from 'react-native-chart-kit';
const screenWidth = Dimensions.get('window').width;
const chartConfig = {
    backgroundGradientFrom: '#cccccc',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#cccccc',
    backgroundGradientToOpacity: 0.5,
    color: () => 'black',
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
    fromZero: true,
    // formatYLabel: (value) => `${value}`,
    formatYLabel: (value: number) => `${value / 1000}k`,
};

export default function Line({ labels, data }: { labels: string[]; data: number[] }) {
    return (
        <View style={styles.container}>
            <BarChart
                data={{
                    labels: labels,
                    datasets: [
                        {
                            data: data,
                        },
                    ],
                }}
                width={screenWidth - 20}
                height={220}
                yAxisLabel={''}
                chartConfig={chartConfig}
                yAxisSuffix={''}
                // fromZero={true}
                // showValuesOnTopOfBars={true}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 10,
    },
});
