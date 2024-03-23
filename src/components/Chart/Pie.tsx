import { Dimensions, StyleSheet, View } from 'react-native';
const screenWidth = Dimensions.get('window').width;
import {
    LineChart,
    BarChart,
    PieChart,
    ProgressChart,
    ContributionGraph,
    StackedBarChart,
} from 'react-native-chart-kit';
const chartConfig = {
    backgroundGradientFrom: '#1E2923',
    backgroundGradientFromOpacity: 0,
    backgroundGradientTo: '#08130D',
    backgroundGradientToOpacity: 0.5,
    color: (opacity = 1) => `rgba(26, 255, 146, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional
};
const data = [
    {
        name: 'Seoul',
        population: 20,
        color: 'rgba(131, 167, 234, 1)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Toronto',
        population: 20,
        color: '#000000',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Beijing',
        population: 20,
        color: 'red',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'New York',
        population: 20,
        color: '#ffffff',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
    {
        name: 'Moscow',
        population: 20,
        color: 'rgb(0, 0, 255)',
        legendFontColor: '#7F7F7F',
        legendFontSize: 15,
    },
];
export default function Pie() {
    return (
        <View>
            <PieChart
                data={data}
                width={screenWidth}
                height={220}
                chartConfig={chartConfig}
                accessor={'population'}
                backgroundColor={'transparent'}
                paddingLeft={'15'}
                center={[10, 10]}
                absolute
            />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#F5FCFF',
    },
    chart: {
        flex: 1,
    },
});
