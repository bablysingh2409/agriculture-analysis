import { useEffect, useState } from "react";
import {
  Table,
  Paper,
  Title,
  Text,
  Group,
  Badge,
  Container,
  Box,
} from "@mantine/core";
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
  const [yearlyData, setYearlyData] = useState<YearlyAnalysis[]>([]);

  useEffect(() => {
    const processData = () => {
      // Group data by year
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

      const yearlyAnalysis = Object.entries(yearlyGroups).map(
        ([year, crops]) => {
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
    <Container size="lg" className="py-8">
      <Paper shadow="sm" radius="md" className="p-6 mb-6">
        <Title order={2} className="mb-2">
          Indian Agriculture Analysis Dashboard
        </Title>
        <Text size="sm" c="dimmed" className="mb-6">
          Yearly analysis of crop production trends across India
        </Text>
        <Box className="max-w-[900px] mx-auto">
          <Table
            striped
            highlightOnHover
            withTableBorder
            withColumnBorders
            styles={{
              table: {
                tableLayout: 'fixed',
                width: '100%',
              },
              th: {
                backgroundColor: 'var(--mantine-color-gray-0)',
                padding: 'var(--mantine-spacing-sm)',
              },
              td: {
                padding: 'var(--mantine-spacing-sm)',
              },
            }}
          >
            <Table.Thead>
              <Table.Tr>
                <Table.Th style={{ width: '20%' }}>Financial Year</Table.Th>
                <Table.Th style={{ width: '40%' }}>
                  <Group gap="xs">
                    Highest Production Crop
                  </Group>
                </Table.Th>
                <Table.Th style={{ width: '40%' }}>
                  <Group gap="xs">
                    Lowest Production Crop
                  </Group>
                </Table.Th>
              </Table.Tr>
            </Table.Thead>
            <Table.Tbody>
              {yearlyData.map((yearData) => (
                <Table.Tr key={yearData.year}>
                  <Table.Td>
                    <Badge variant="light" className="whitespace-nowrap">
                      {yearData.year.replace("Financial Year (Apr - Mar), ", "")}
                    </Badge>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Text fw={500}>{yearData.maxProductionCrop.name}</Text>
                      <Badge color="green" variant="light">
                        {yearData.maxProductionCrop.production.toLocaleString()} t
                      </Badge>
                    </Group>
                  </Table.Td>
                  <Table.Td>
                    <Group gap="xs">
                      <Text fw={500}>{yearData.minProductionCrop.name}</Text>
                      <Badge color="red" variant="light">
                        {yearData.minProductionCrop.production.toLocaleString()} t
                      </Badge>
                    </Group>
                  </Table.Td>
                </Table.Tr>
              ))}
            </Table.Tbody>
          </Table>
        </Box>
      </Paper>
    </Container>
  );
};

export default AgricultureDashboard;