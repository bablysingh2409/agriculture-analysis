import { useEffect, useState } from "react";
import { Table, Paper, Title, Text } from "@mantine/core";
import { Sprout, LineChart, ArrowUpRight } from "lucide-react";
import data from "../data.json";
interface CropStats {
  cropName: string;
  averageYield: number;
  averageCultivation: number;
}

const CropStatistics = () => {
  // State to store processed crop statistics
  const [cropStats, setCropStats] = useState<CropStats[]>([]);
  // State to track total number of unique crops analyzed
  const [totalCrops, setTotalCrops] = useState(0);

  useEffect(() => {
    /*
      Processes agricultural data to calculate crop performance metrics
      Groups data by crop and calculates averages for yield and cultivation area
     */
    const processData = () => {
      // Group data by crop name
      const cropGroups = data.reduce((acc: Record<string, any[]>, item) => {
        const cropName = item["Crop Name"];
        if (!acc[cropName]) {
          acc[cropName] = [];
        }

        // Only include records with valid yield and cultivation data
        if (
          item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] !== "" &&
          item["Area Under Cultivation (UOM:Ha(Hectares))"] !== ""
        ) {
          acc[cropName].push({
            yield:
              Number(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) ||
              0,
            cultivation:
              Number(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
          });
        }
        return acc;
      }, {});

      // Calculate average statistics for each crop
      const statistics = Object.entries(cropGroups).map(
        ([cropName, records]) => {
          // Calculate average yield for the crop
          const avgYield =
            records.reduce((sum, record) => sum + record.yield, 0) /
            records.length;
          
          // Calculate average cultivation area for the crop
          const avgCultivation =
            records.reduce((sum, record) => sum + record.cultivation, 0) /
            records.length;

          return {
            cropName,
            averageYield: avgYield,
            averageCultivation: avgCultivation,
          };
        }
      );

      // Sort crops by average yield in descending order
      statistics.sort((a, b) => b.averageYield - a.averageYield);
      setCropStats(statistics);
      setTotalCrops(statistics.length);
    };

    processData();
  }, []);

  return (
    <Paper shadow="sm" radius="md" p="md" className="h-full">
      <div className="space-y-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-green-50 p-2.5 rounded-xl">
              <Sprout className="h-7 w-7 text-green-600" />
            </div>
            <div>
              <Title order={2} className="text-gray-800 mb-2">
                Crop Performance Analysis
              </Title>
              <Text size="sm" className="text-gray-500">
                Comprehensive analysis of crop yields and cultivation areas
              </Text>
            </div>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <Text className="text-blue-700 font-semibold">
              {totalCrops} Crops Analyzed
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <LineChart className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <Text size="sm" className="text-gray-500">
                Time Period
              </Text>
              <Text className="font-semibold text-gray-700">1950-2020</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <ArrowUpRight className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <Text size="sm" className="text-gray-500">
                Data Type
              </Text>
              <Text className="font-semibold text-gray-700">
                Average Performance
              </Text>
            </div>
          </div>
        </div>
      </div>

      <Table
         className="border border-gray-300 p-4 rounded-lg"
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "30%", textAlign: "center" }}>
              <Text className="text-gray-700 font-semibold tracking-wide">
                Crop Name
              </Text>
            </Table.Th>
            <Table.Th style={{ width: "35%", textAlign: "center" }}>
              <Text className="text-gray-700 font-semibold tracking-wide">
                Average Yield of the Crop between 1950-2020
              </Text>
            </Table.Th>
            <Table.Th style={{ width: "35%", textAlign: "center" }}>
              <Text className="text-gray-700 font-semibold tracking-wide">
                Average Cultivation Area of the Crop between 1950-2020
              </Text>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {cropStats.map((stat) => (
            <Table.Tr
              key={stat.cropName}
              className="hover:bg-gray-50 transition-colors duration-150"
            >
              {/* Crop Name Column */}
              <Table.Td style={{ width: "30%", textAlign: "center" }}>
                <Text className="font-medium text-gray-700">
                  {stat.cropName}
                </Text>
              </Table.Td>
              {/* Average Yield Column */}
              <Table.Td style={{ width: "35%", textAlign: "center" }}>
                <div className="flex justify-center">
                  <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full">
                    {stat.averageYield.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </Table.Td>
              {/* Average Cultivation Area Column */}
              <Table.Td style={{ width: "35%", textAlign: "center" }}>
                <div className="flex justify-center">
                  <div className="px-3 py-1.5 bg-purple-50 text-purple-700 rounded-full">
                    {stat.averageCultivation.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default CropStatistics;