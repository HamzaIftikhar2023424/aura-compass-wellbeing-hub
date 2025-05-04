
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { prescriptionService } from '@/services/api';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { format, parseISO, isAfter } from 'date-fns';
import { useAuth } from '@/contexts/AuthContext';
import { Pill } from 'lucide-react';

interface Prescription {
  id: number;
  userId: number;
  medicationName: string;
  dosage: string;
  frequency: string;
  startDate: string;
  endDate: string;
  instructions: string;
  prescribedBy: string;
}

const Prescriptions = () => {
  const { user } = useAuth();
  
  const { data, isLoading, error } = useQuery({
    queryKey: ['prescriptions', user?.id],
    queryFn: () => prescriptionService.getPrescriptions(user?.id || 0),
    enabled: !!user?.id
  });

  const prescriptions = data?.data || [];
  const today = new Date();

  const getPrescriptionStatus = (endDate: string) => {
    const end = parseISO(endDate);
    return isAfter(end, today) ? 'active' : 'expired';
  };

  return (
    <div className="container mx-auto py-8 px-4">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">My Prescriptions</h1>
        <p className="text-mentora-subtext">
          Track and manage your medication prescriptions
        </p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="animate-pulse rounded-full bg-mentora-teal h-12 w-12"></div>
        </div>
      ) : error ? (
        <Card>
          <CardContent className="py-8">
            <p className="text-red-500 text-center">Error loading prescriptions. Please try again later.</p>
          </CardContent>
        </Card>
      ) : prescriptions.length === 0 ? (
        <Card>
          <CardContent className="py-12 text-center">
            <div className="flex justify-center mb-4">
              <Pill className="h-16 w-16 text-mentora-teal/50" />
            </div>
            <h3 className="text-xl font-medium mb-2">No Prescriptions</h3>
            <p className="text-mentora-subtext">
              You don't have any prescriptions on record.
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <div className="flex items-center space-x-2">
                <Pill className="h-5 w-5 text-mentora-teal" />
                <CardTitle>Active Prescriptions</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Medication</TableHead>
                      <TableHead>Dosage</TableHead>
                      <TableHead>Frequency</TableHead>
                      <TableHead>Start Date</TableHead>
                      <TableHead>End Date</TableHead>
                      <TableHead>Status</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {prescriptions.map((prescription: Prescription) => {
                      const status = getPrescriptionStatus(prescription.endDate);
                      return (
                        <TableRow key={prescription.id}>
                          <TableCell className="font-medium">{prescription.medicationName}</TableCell>
                          <TableCell>{prescription.dosage}</TableCell>
                          <TableCell>{prescription.frequency}</TableCell>
                          <TableCell>{format(parseISO(prescription.startDate), 'MMM d, yyyy')}</TableCell>
                          <TableCell>{format(parseISO(prescription.endDate), 'MMM d, yyyy')}</TableCell>
                          <TableCell>
                            <Badge 
                              className={status === 'active' ? 
                                'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                                'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                              }
                            >
                              {status === 'active' ? 'Active' : 'Expired'}
                            </Badge>
                          </TableCell>
                        </TableRow>
                      );
                    })}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Medication Details</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {prescriptions.map((prescription: Prescription) => (
                  <Card key={prescription.id} className="bg-white dark:bg-gray-800 border-none shadow-sm">
                    <CardHeader className="pb-2">
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle>{prescription.medicationName}</CardTitle>
                          <CardDescription className="text-mentora-teal">
                            {prescription.dosage} • {prescription.frequency}
                          </CardDescription>
                        </div>
                        <Badge 
                          className={getPrescriptionStatus(prescription.endDate) === 'active' ? 
                            'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-100' : 
                            'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-100'
                          }
                        >
                          {getPrescriptionStatus(prescription.endDate) === 'active' ? 'Active' : 'Expired'}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      <div>
                        <p className="text-sm font-medium">Instructions:</p>
                        <p className="text-mentora-subtext">{prescription.instructions}</p>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <p className="text-sm font-medium">Start Date:</p>
                          <p className="text-mentora-subtext">{format(parseISO(prescription.startDate), 'MMMM d, yyyy')}</p>
                        </div>
                        <div>
                          <p className="text-sm font-medium">End Date:</p>
                          <p className="text-mentora-subtext">{format(parseISO(prescription.endDate), 'MMMM d, yyyy')}</p>
                        </div>
                      </div>
                      <div>
                        <p className="text-sm font-medium">Prescribed By:</p>
                        <p className="text-mentora-subtext">{prescription.prescribedBy}</p>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default Prescriptions;
