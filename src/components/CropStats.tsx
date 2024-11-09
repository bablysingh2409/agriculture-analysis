import { useEffect, useState } from "react";
import { Table, Paper, Title, Text } from '@mantine/core';
import { Sprout } from "lucide-react";
import data from '../data.json'

interface CropStats {
  cropName: string;
  averageYield: number;
  averageCultivation: number;
}

const CropStatistics = () => {
  const [cropStats, setCropStats] = useState<CropStats[]>([]);

  useEffect(() => {
    const processData = () => {
      const cropGroups = data.reduce((acc: Record<string, any[]>, item) => {
        const cropName = item["Crop Name"];
        if (!acc[cropName]) {
          acc[cropName] = [];
        }
        
        if (
          item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"] !== "" &&
          item["Area Under Cultivation (UOM:Ha(Hectares))"] !== ""
        ) {
          acc[cropName].push({
            yield: Number(item["Yield Of Crops (UOM:Kg/Ha(KilogramperHectare))"]) || 0,
            cultivation: Number(item["Area Under Cultivation (UOM:Ha(Hectares))"]) || 0,
          });
        }
        return acc;
      }, {});

      const statistics = Object.entries(cropGroups).map(([cropName, records]) => {
        const avgYield = records.reduce((sum, record) => sum + record.yield, 0) / records.length;
        const avgCultivation = records.reduce((sum, record) => sum + record.cultivation, 0) / records.length;

        return {
          cropName,
          averageYield: avgYield,
          averageCultivation: avgCultivation,
        };
      });

      statistics.sort((a, b) => b.averageYield - a.averageYield);
      setCropStats(statistics);
    };

    processData();
  }, []);

  return (
    <Paper shadow="sm" radius="md" p="md" className="h-full">
      <div className="flex items-center gap-3 mb-4">
        <div className="bg-green-50 p-2 rounded-full">
          <Sprout className="h-6 w-6 text-green-600" />
        </div>
        <Title order={2} className="text-gray-800">Crop Performance Analysis</Title>
      </div>
      <Text size="sm" c="dimmed" className="mb-6">
        Average yield and cultivation area statistics (1950-2020)
      </Text>

      <Table 
        striped 
        highlightOnHover 
        withTableBorder 
        withColumnBorders
        styles={{
          th: {
            backgroundColor: 'var(--mantine-color-gray-0)',
            padding: 'var(--mantine-spacing-md)',
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
            <Table.Th style={{ width: '30%', textAlign: 'center' }}>
              <Text className="text-gray-700 font-semibold tracking-wide">
                Crop Name
              </Text>
            </Table.Th>
            <Table.Th style={{ width: '35%', textAlign: 'center' }}>
              <Text className="text-gray-700 font-semibold tracking-wide">
                Kilograms per Hectare (Kg/Ha)
              </Text>
            </Table.Th>
            <Table.Th style={{ width: '35%', textAlign: 'center' }}>
              <Text className="text-gray-700 font-semibold tracking-wide">
                Area in Hectares (Ha)
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
              <Table.Td style={{ width: '30%' }}>
                <Text className="font-medium text-gray-500">
                  {stat.cropName}
                </Text>
              </Table.Td>
              <Table.Td style={{ width: '35%', textAlign: 'center' }}>
                <div className="flex justify-center">
                  <div className="px-3 py-1.5 bg-blue-50 text-blue-700 rounded-full">
                    {stat.averageYield.toLocaleString(undefined, {
                      maximumFractionDigits: 2,
                    })}
                  </div>
                </div>
              </Table.Td>
              <Table.Td style={{ width: '35%', textAlign: 'center' }}>
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