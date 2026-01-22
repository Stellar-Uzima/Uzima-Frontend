"use client"

import { useState } from "react"
import { format } from "date-fns"
import { Download, ArrowUpDown, CheckCircle, Clock, XCircle } from "lucide-react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Earning } from "@/lib/types/profile"
import { mockEarnings } from "@/lib/mock-data/profile"

interface EarningsTableProps {
  userId: string
}

type SortField = 'date' | 'amount' | 'status'
type SortDirection = 'asc' | 'desc'

export function EarningsTable({ userId }: EarningsTableProps) {
  const [sortField, setSortField] = useState<SortField>('date')
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc')
  
  // In a real app, this would fetch data based on userId
  const earnings = mockEarnings

  const sortedEarnings = [...earnings].sort((a, b) => {
    let aValue: any = a[sortField]
    let bValue: any = b[sortField]

    if (sortField === 'date') {
      aValue = new Date(aValue).getTime()
      bValue = new Date(bValue).getTime()
    }

    if (sortDirection === 'asc') {
      return aValue > bValue ? 1 : -1
    } else {
      return aValue < bValue ? 1 : -1
    }
  })

  const totalEarnings = earnings
    .filter(earning => earning.status === 'completed')
    .reduce((sum, earning) => sum + earning.amount, 0)

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const exportToCSV = () => {
    const headers = ['Date', 'Description', 'Amount (XLM)', 'Status', 'Transaction Hash']
    const csvContent = [
      headers.join(','),
      ...sortedEarnings.map(earning => [
        format(earning.date, 'yyyy-MM-dd HH:mm:ss'),
        `"${earning.description}"`,
        earning.amount,
        earning.status,
        earning.transactionHash || ''
      ].join(','))
    ].join('\n')

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' })
    const link = document.createElement('a')
    const url = URL.createObjectURL(blob)
    link.setAttribute('href', url)
    link.setAttribute('download', `earnings-${format(new Date(), 'yyyy-MM-dd')}.csv`)
    link.style.visibility = 'hidden'
    document.body.appendChild(link)
    link.click()
    document.body.removeChild(link)
  }

  const getStatusIcon = (status: Earning['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case 'pending':
        return <Clock className="h-4 w-4 text-yellow-600" />
      case 'failed':
        return <XCircle className="h-4 w-4 text-red-600" />
    }
  }

  const getStatusBadge = (status: Earning['status']) => {
    const variants = {
      completed: 'default',
      pending: 'secondary',
      failed: 'destructive'
    } as const

    return (
      <Badge variant={variants[status]} className="gap-1">
        {getStatusIcon(status)}
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    )
  }

  if (earnings.length === 0) {
    return (
      <div className="text-center py-8">
        <Download className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
        <p className="text-muted-foreground">No earnings yet. Start contributing to earn XLM!</p>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Export Button */}
      <div className="flex justify-between items-center">
        <div className="text-sm text-muted-foreground">
          Total earnings: <span className="font-semibold text-foreground">{totalEarnings.toLocaleString()} XLM</span>
        </div>
        <Button onClick={exportToCSV} variant="outline" size="sm" className="gap-2">
          <Download className="h-4 w-4" />
          Export CSV
        </Button>
      </div>

      {/* Earnings Table */}
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('date')}
                >
                  Date
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="text-right">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('amount')}
                >
                  Amount (XLM)
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-auto p-0 font-semibold"
                  onClick={() => handleSort('status')}
                >
                  Status
                  <ArrowUpDown className="ml-2 h-3 w-3" />
                </Button>
              </TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {sortedEarnings.map((earning) => (
              <TableRow key={earning.id}>
                <TableCell className="font-medium">
                  {format(earning.date, 'MMM dd, yyyy')}
                  <div className="text-xs text-muted-foreground">
                    {format(earning.date, 'HH:mm')}
                  </div>
                </TableCell>
                <TableCell>
                  <div>
                    {earning.description}
                    {earning.transactionHash && (
                      <div className="text-xs text-muted-foreground font-mono mt-1">
                        {earning.transactionHash.slice(0, 12)}...
                      </div>
                    )}
                  </div>
                </TableCell>
                <TableCell className="text-right font-semibold">
                  +{earning.amount.toLocaleString()}
                </TableCell>
                <TableCell>
                  {getStatusBadge(earning.status)}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      {/* Summary */}
      <div className="bg-muted/50 rounded-lg p-4 border">
        <div className="flex justify-between items-center">
          <span className="text-sm font-medium">Total Completed Earnings:</span>
          <span className="text-lg font-bold text-green-600">
            {totalEarnings.toLocaleString()} XLM
          </span>
        </div>
        <div className="flex justify-between items-center mt-2">
          <span className="text-xs text-muted-foreground">
            From {earnings.filter(e => e.status === 'completed').length} completed transactions
          </span>
          <span className="text-xs text-muted-foreground">
            {earnings.filter(e => e.status === 'pending').length} pending
          </span>
        </div>
      </div>
    </div>
  )
}