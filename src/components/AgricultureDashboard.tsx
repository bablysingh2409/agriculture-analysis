import { useEffect, useState } from "react";
import { Table, Paper, Title, Text, Badge } from "@mantine/core";
import { BarChart2, TrendingUp, Calendar } from "lucide-react";
import data from "../data.json";

interface YearlyAnalysis {
  year: string;
  maxProductionCrop: {
    name: string;
    production: number;
  };
  minProductionCrop: {
    name: string;
    production: number;
  };
}
const AgricultureDashboard = () => {
  // State to store processed yearly data
  const [yearlyData, setYearlyData] = useState<YearlyAnalysis[]>([]);
  // State to track total number of years analyzed
  const [totalYears, setTotalYears] = useState(0);

  useEffect(() => {
    /*
     Processes raw agricultural data to extract yearly production statistics
     Groups data by year and identifies max/min production crops
     */
    const processData = () => {
      // Group data by year
      const yearlyGroups = data.reduce((acc: Record<string, any[]>, item) => {
        const year = item.Year;
        if (!acc[year]) {
          acc[year] = [];
        }
        // Only include items with valid production values
        if (item["Crop Production (UOM:t(Tonnes))"] !== "") {
          acc[year].push({
            cropName: item["Crop Name"],
            production: Number(item["Crop Production (UOM:t(Tonnes))"]) || 0,
          });
        }
        return acc;
      }, {});

      // Process each year's data to find max and min production
      const yearlyAnalysis = Object.entries(yearlyGroups).map(
        ([year, crops]) => {
          // Sort crops by production value to identify max and min
          const sortedCrops = [...crops].sort(
            (a, b) => b.production - a.production
          );

          return {
            year,
            maxProductionCrop: {
              name: sortedCrops[0]?.cropName || "N/A",
              production: sortedCrops[0]?.production || 0,
            },
            minProductionCrop: {
              name: sortedCrops[sortedCrops.length - 1]?.cropName || "N/A",
              production: sortedCrops[sortedCrops.length - 1]?.production || 0,
            },
          };
        }
      );

      // Sort data chronologically by year
      yearlyAnalysis.sort((a, b) => {
        const yearA = a.year.match(/\d{4}/)?.[0] || "";
        const yearB = b.year.match(/\d{4}/)?.[0] || "";
        return yearA.localeCompare(yearB);
      });

      setYearlyData(yearlyAnalysis);
      setTotalYears(yearlyAnalysis.length);
    };

    processData();
  }, []);

  return (
    <Paper shadow="sm" radius="md" p="md" className="h-full">
      <div className="space-y-6 mb-8">
        <div className="flex items-start justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-blue-50 p-2.5 rounded-xl">
              <BarChart2 className="h-7 w-7 text-blue-600" />
            </div>
            <div>
              <Title order={2} className="text-gray-800 mb-2">
                Production Trends Analysis
              </Title>
              <Text size="sm" className="text-gray-500">
                Year-wise highest and lowest crop production analysis
              </Text>
            </div>
          </div>
          <div className="bg-blue-50 px-4 py-2 rounded-lg">
            <Text className="text-blue-700 font-semibold">
              {totalYears} Years Analyzed
            </Text>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 bg-gray-50 p-4 rounded-lg">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-emerald-50 rounded-lg">
              <Calendar className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <Text size="sm" className="text-gray-500">
                Coverage Period
              </Text>
              <Text className="font-semibold text-gray-700">1950-2020</Text>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-50 rounded-lg">
              <TrendingUp className="h-5 w-5 text-purple-600" />
            </div>
            <div>
              <Text size="sm" className="text-gray-500">
                Analysis Type
              </Text>
              <Text className="font-semibold text-gray-700">
                Production Trends
              </Text>
            </div>
          </div>
        </div>
      </div>

      <Table
        striped
        highlightOnHover
        withTableBorder
        withColumnBorders
        styles={{
          th: {
            backgroundColor: "var(--mantine-color-gray-0)",
            padding: "var(--mantine-spacing-lg)",
            fontSize: "var(--mantine-font-size-sm)",
            lineHeight: "1.5",
          },
          td: {
            padding: "var(--mantine-spacing-md)",
            borderBottom: "1px solid var(--mantine-color-gray-2)",
            verticalAlign: "middle",
          },
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th style={{ width: "25%" }}>
              <div className="space-y-2">
                <Text className="text-gray-700 font-semibold tracking-wide">
                  Financial Year
                </Text>
              </div>
            </Table.Th>
            <Table.Th style={{ width: "37.5%" }}>
              <div className="space-y-2">
                <Text className="text-gray-700 font-semibold tracking-wide">
                  Crop with Maximum Production in that Year
                </Text>
              </div>
            </Table.Th>
            <Table.Th style={{ width: "37.5%" }}>
              <div className="space-y-2">
                <Text className="text-gray-700 font-semibold tracking-wide">
                  Crop with Minimum Production in that Year
                </Text>
              </div>
            </Table.Th>
          </Table.Tr>
        </Table.Thead>

        <Table.Tbody>
          {yearlyData.map((yearData) => (
            <Table.Tr key={yearData.year} className="hover:bg-gray-50">
              <Table.Td>
                <Badge
                  variant="outline"
                  color="blue"
                  size="lg"
                  className="px-4 py-1 font-medium"
                >
                  {yearData.year.replace("Financial Year (Apr - Mar), ", "")}
                </Badge>
              </Table.Td>
              {/* Maximum Production Crop Column */}
              <Table.Td>
                <Text className="text-emerald-700 font-medium">
                  {yearData.maxProductionCrop.name}
                </Text>
              </Table.Td>
              {/* Minimum Production Crop Column */}
              <Table.Td>
                <Text className="text-rose-700 font-medium">
                  {yearData.minProductionCrop.name}
                </Text>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default AgricultureDashboard;