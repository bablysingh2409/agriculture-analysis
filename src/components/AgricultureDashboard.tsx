import { useEffect, useState } from "react";
import { Table, Paper, Title, Text, Group, Badge } from '@mantine/core';
import data from '../data.json'

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
  const [yearlyData, setYearlyData] = useState<YearlyAnalysis[]>([]);

  useEffect(() => {
    const processData = () => {
      const yearlyGroups = data.reduce((acc: Record<string, any[]>, item) => {
        const year = item.Year;
        if (!acc[year]) {
          acc[year] = [];
        }
        if (item["Crop Production (UOM:t(Tonnes))"] !== "") {
          acc[year].push({
            cropName: item["Crop Name"],
            production: Number(item["Crop Production (UOM:t(Tonnes))"]) || 0,
          });
        }
        return acc;
      }, {});

      const yearlyAnalysis = Object.entries(yearlyGroups).map(([year, crops]) => {
        const sortedCrops = [...crops].sort((a, b) => b.production - a.production);
        
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
      });

      yearlyAnalysis.sort((a, b) => {
        const yearA = a.year.match(/\d{4}/)?.[0] || "";
        const yearB = b.year.match(/\d{4}/)?.[0] || "";
        return yearA.localeCompare(yearB);
      });

      setYearlyData(yearlyAnalysis);
    };

    processData();
  }, []);

  return (
    <Paper shadow="sm" radius="md" p="md" className="h-full">
      <div className="flex items-center gap-2 mb-4">
        <Title order={2} className="text-gray-800">Production Trends Analysis</Title>
      </div>
      <Text size="sm" c="dimmed" className="mb-6">
        Year-wise analysis of crop production trends across India (1950-2020)
      </Text>

      <Table 
        striped 
        highlightOnHover 
        withTableBorder 
        withColumnBorders
        styles={{
          th: {
            backgroundColor: 'var(--mantine-color-gray-0)',
            padding: 'var(--mantine-spacing-lg)',
            fontSize: 'var(--mantine-font-size-sm)',
            lineHeight: '1.5',
          },
          td: {
            padding: 'var(--mantine-spacing-md)',
            borderBottom: '1px solid var(--mantine-color-gray-2)',
            verticalAlign: 'middle',
          }
        }}
      >
        <Table.Thead>
          <Table.Tr>
            <Table.Th className="w-1/4">
              <Text className="text-gray-700 font-semibold tracking-wide">
                Financial Year
              </Text>
            </Table.Th>
            <Table.Th className="w-[37.5%]">
              <div className="space-y-1">
                <Text className="text-gray-700 font-semibold tracking-wide">
                  {/* Highest Production Crop */}
                  Crop with maximum production (tonnes)
                </Text>
                {/* <Text size="xs" className="text-gray-500">
                  Crop with maximum production (tonnes)
                </Text> */}
              </div>
            </Table.Th>
            <Table.Th className="w-[37.5%]">
              <div className="space-y-1">
                <Text className="text-gray-700 font-semibold tracking-wide">
                  {/* Lowest Production Crop */}
                  Crop with minimum production (tonnes)
                </Text>
                {/* <Text size="xs" className="text-gray-500">
                  Crop with minimum production (tonnes)
                </Text> */}
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
              <Table.Td>
                <div className="space-y-1">
                  <Text className="text-emerald-700 font-medium">
                    {yearData.maxProductionCrop.name}
                  </Text>
                  {/* <div className="flex items-center gap-2">
                    <Badge 
                      color="teal" 
                      variant="light"
                      className="px-3 py-1"
                    >
                      {yearData.maxProductionCrop.production.toLocaleString()} tonnes
                    </Badge>
                  </div> */}
                </div>
              </Table.Td>
              <Table.Td>
                <div className="space-y-1">
                  <Text className="text-rose-700 font-medium">
                    {yearData.minProductionCrop.name}
                  </Text>
                  {/* <div className="flex items-center gap-2">
                    <Badge 
                      color="red" 
                      variant="light"
                      className="px-3 py-1"
                    >
                      {yearData.minProductionCrop.production.toLocaleString()} tonnes
                    </Badge>
                  </div> */}
                </div>
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>
    </Paper>
  );
};

export default AgricultureDashboard;