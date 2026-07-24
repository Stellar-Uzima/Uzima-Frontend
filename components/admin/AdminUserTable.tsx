'use client';

import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Shield, UserX, UserCheck, Download } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/ui/alert-dialog';
import { useDebounce } from '@/hooks/use-debounce';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended';
  joined: string;
}

type BulkAction = 'suspend' | 'reactivate';

export default function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [pendingAction, setPendingAction] = useState<BulkAction | null>(null);

  useEffect(() => {
    async function fetchUsers() {
      setLoading(true);
      try {
        const response = await fetch(`/api/admin/users?page=${page}&search=${debouncedSearch}`);
        const data = await response.json();
        setUsers(data.users);
        setTotalPages(data.totalPages);
      } catch (error) {
        console.error('Failed to fetch users:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchUsers();
  }, [page, debouncedSearch]);

  // Clear selection on page change
  useEffect(() => {
    setSelectedIds(new Set());
  }, [page]);

  const toggleUserStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus as User['status'] } : u));
    // Real API call here
  };

  const allOnPageSelected = users.length > 0 && users.every(u => selectedIds.has(u.id));
  const someOnPageSelected = users.some(u => selectedIds.has(u.id)) && !allOnPageSelected;

  const toggleSelectAll = () => {
    if (allOnPageSelected) {
      const next = new Set(selectedIds);
      users.forEach(u => next.delete(u.id));
      setSelectedIds(next);
    } else {
      const next = new Set(selectedIds);
      users.forEach(u => next.add(u.id));
      setSelectedIds(next);
    }
  };

  const toggleSelectOne = (id: string) => {
    const next = new Set(selectedIds);
    if (next.has(id)) {
      next.delete(id);
    } else {
      next.add(id);
    }
    setSelectedIds(next);
  };

  const openConfirm = (action: BulkAction) => {
    setPendingAction(action);
    setConfirmOpen(true);
  };

  const executeBulkAction = async () => {
    if (!pendingAction) return;
    const ids = Array.from(selectedIds);
    try {
      await fetch('/api/admin/users', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ids, action: pendingAction }),
      });
      const newStatus = pendingAction === 'suspend' ? 'suspended' : 'active';
      setUsers(prev =>
        prev.map(u => selectedIds.has(u.id) ? { ...u, status: newStatus } : u)
      );
    } catch (error) {
      console.error('Bulk action failed:', error);
    } finally {
      setSelectedIds(new Set());
      setPendingAction(null);
      setConfirmOpen(false);
    }
  };

  const handleBulkExport = () => {
    const selectedUsers = users.filter(u => selectedIds.has(u.id));
    const header = ['Name', 'Email', 'Role', 'Status', 'Joined'];
    const rows = selectedUsers.map(u => [u.name, u.email, u.role, u.status, u.joined]);
    const csv = [header, ...rows].map(r => r.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'selected-users.csv';
    a.click();
    URL.revokeObjectURL(url);
    setSelectedIds(new Set());
  };

  const confirmLabel = pendingAction === 'suspend' ? 'Suspend' : 'Reactivate';
  const confirmDescription =
    pendingAction === 'suspend'
      ? `This will suspend ${selectedIds.size} user${selectedIds.size > 1 ? 's' : ''}. They will lose access until reactivated.`
      : `This will reactivate ${selectedIds.size} user${selectedIds.size > 1 ? 's' : ''}. They will regain access immediately.`;

  return (
    <div className="bg-white rounded-3xl border border-terra/10 shadow-sm overflow-hidden animate-scaleIn">

      {/* ── Header: title + search ───────────────────────────────────────────── */}
      <div className="p-4 sm:p-6 border-b border-terra/5 flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
        <div>
          <h3 className="font-serif text-xl font-bold text-earth">User Management</h3>
          <p className="text-sm text-muted">Manage roles and account statuses.</p>
        </div>

        {/* Search — full-width on mobile, fixed on sm+ */}
        <div className="relative w-full sm:w-64 flex-shrink-0">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted pointer-events-none" />
          <Input
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 placeholder:text-muted/50 rounded-xl w-full"
            aria-label="Search users"
          />
        </div>
      </div>

      {/* ── Bulk-action bar (visible when ≥1 row selected) ───────────────────── */}
      {selectedIds.size > 0 && (
        <div className="px-4 sm:px-6 py-3 border-b border-terra/5 bg-cream/40 flex flex-wrap items-center justify-center gap-3">
          <span className="text-sm font-semibold text-earth shrink-0">
            {selectedIds.size} user{selectedIds.size > 1 ? 's' : ''} selected
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl text-terra border-terra/30 hover:bg-terra/5"
              onClick={() => openConfirm('suspend')}
            >
              <UserX className="w-4 h-4 mr-1.5" />
              Suspend selected
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl text-sage border-sage/30 hover:bg-sage/5"
              onClick={() => openConfirm('reactivate')}
            >
              <UserCheck className="w-4 h-4 mr-1.5" />
              Reactivate selected
            </Button>
            <Button
              size="sm"
              variant="outline"
              className="rounded-xl text-earth border-terra/20 hover:bg-cream/60"
              onClick={handleBulkExport}
            >
              <Download className="w-4 h-4 mr-1.5" />
              Export selected to CSV
            </Button>
          </div>
        </div>
      )}

      {/* ── Desktop table (md+) ──────────────────────────────────────────────── */}
      <div className="hidden md:block w-full overflow-x-auto">
        <Table className="min-w-[720px] w-full">
          <TableHeader>
            <TableRow className="bg-cream/30 hover:bg-cream/30">
              <TableHead className="w-[48px] py-4">
                <Checkbox
                  checked={allOnPageSelected}
                  data-state={someOnPageSelected ? 'indeterminate' : undefined}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all users on this page"
                  className="translate-y-[1px]"
                />
              </TableHead>
              <TableHead className="w-[220px] py-4 whitespace-nowrap">User</TableHead>
              <TableHead className="whitespace-nowrap">Role</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="text-right whitespace-nowrap">Joined</TableHead>
              <TableHead className="w-[50px]" aria-label="Actions" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(6)].map((_, j) => (
                    <TableCell key={j} className="py-5">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="py-12 text-center text-muted">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow
                  key={user.id}
                  className={`hover:bg-cream/10 ${selectedIds.has(user.id) ? 'bg-cream/20' : ''}`}
                >
                  <TableCell>
                    <Checkbox
                      checked={selectedIds.has(user.id)}
                      onCheckedChange={() => toggleSelectOne(user.id)}
                      aria-label={`Select ${user.name}`}
                      className="translate-y-[1px]"
                    />
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col min-w-0">
                      <span className="font-semibold text-earth truncate max-w-[180px]">{user.name}</span>
                      <span className="text-xs text-muted truncate max-w-[180px]">{user.email}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="bg-sage/10 text-sage border-none capitalize whitespace-nowrap">
                      {user.role}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        user.status === 'active'
                          ? 'bg-terra/10 text-terra border-none whitespace-nowrap'
                          : 'bg-gray-100 text-gray-500 border-none whitespace-nowrap'
                      }
                    >
                      {user.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right text-sm text-muted whitespace-nowrap">
                    {user.joined}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-8 w-8 text-muted"
                          aria-label={`Actions for ${user.name}`}
                        >
                          <MoreVertical className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="bg-white rounded-xl border-terra/10 shadow-xl">
                        <DropdownMenuItem className="text-sm flex items-center gap-2 cursor-pointer">
                          <Shield className="w-4 h-4" /> Change Role
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => toggleUserStatus(user.id, user.status)}
                          className={`text-sm flex items-center gap-2 cursor-pointer ${user.status === 'active' ? 'text-terra' : 'text-sage'}`}
                        >
                          {user.status === 'active' ? (
                            <><UserX className="w-4 h-4" /> Suspend Account</>
                          ) : (
                            <><UserCheck className="w-4 h-4" /> Activate Account</>
                          )}
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* ── Mobile card list (<md) ───────────────────────────────────────────── */}
      <div className="md:hidden space-y-3 px-4 sm:px-6 py-4">
        {loading ? (
          [...Array(5)].map((_, i) => (
            <div
              key={i}
              className="rounded-2xl border border-terra/10 bg-white p-4 shadow-sm animate-pulse"
            >
              <div className="flex items-start justify-between gap-3 mb-3">
                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 bg-gray-100 rounded" />
                  <div className="h-3 w-1/2 bg-gray-100 rounded" />
                </div>
                <div className="h-8 w-8 bg-gray-100 rounded-xl flex-shrink-0" />
              </div>
              <div className="space-y-2">
                <div className="h-10 bg-gray-100 rounded-2xl" />
                <div className="h-10 bg-gray-100 rounded-2xl" />
                <div className="h-10 bg-gray-100 rounded-2xl" />
              </div>
            </div>
          ))
        ) : users.length === 0 ? (
          <div className="rounded-2xl border border-terra/10 bg-white p-8 text-center text-muted">
            No users found.
          </div>
        ) : (
          users.map((user) => (
            <div
              key={user.id}
              className={`rounded-2xl border border-terra/10 bg-white p-4 shadow-sm ${selectedIds.has(user.id) ? 'ring-1 ring-terra/30' : ''}`}
            >
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 overflow-hidden">
                  <Checkbox
                    checked={selectedIds.has(user.id)}
                    onCheckedChange={() => toggleSelectOne(user.id)}
                    aria-label={`Select ${user.name}`}
                    className="mt-0.5 shrink-0"
                  />
                  <div className="min-w-0 overflow-hidden">
                    <p className="font-semibold text-earth truncate">{user.name}</p>
                    <p className="text-xs text-muted truncate">{user.email}</p>
                  </div>
                </div>

                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted flex-shrink-0"
                      aria-label={`Actions for ${user.name}`}
                    >
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="bg-white rounded-xl border-terra/10 shadow-xl">
                    <DropdownMenuItem className="text-sm flex items-center gap-2 cursor-pointer">
                      <Shield className="w-4 h-4" /> Change Role
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => toggleUserStatus(user.id, user.status)}
                      className={`text-sm flex items-center gap-2 cursor-pointer ${user.status === 'active' ? 'text-terra' : 'text-sage'}`}
                    >
                      {user.status === 'active' ? (
                        <><UserX className="w-4 h-4" /> Suspend Account</>
                      ) : (
                        <><UserCheck className="w-4 h-4" /> Activate Account</>
                      )}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>

              {/* Detail rows */}
              <div className="mt-3 grid gap-2">
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">Role</span>
                  <Badge variant="secondary" className="bg-sage/10 text-sage border-none capitalize">
                    {user.role}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">Status</span>
                  <Badge
                    className={
                      user.status === 'active'
                        ? 'bg-terra/10 text-terra border-none'
                        : 'bg-gray-100 text-gray-500 border-none'
                    }
                  >
                    {user.status}
                  </Badge>
                </div>
                <div className="flex items-center justify-between gap-3 rounded-2xl bg-slate-50 px-3 py-2.5">
                  <span className="text-xs font-semibold uppercase tracking-wide text-muted">Joined</span>
                  <span className="text-sm text-muted">{user.joined}</span>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* ── Pagination ───────────────────────────────────────────────────────── */}
      {totalPages > 1 && (
        <div className="p-4 border-t border-terra/5 flex items-center justify-center gap-2 flex-wrap">
          <Button
            variant="outline"
            disabled={page === 1}
            onClick={() => setPage(page - 1)}
            className="rounded-xl min-w-[96px]"
            aria-label="Previous page"
          >
            Previous
          </Button>
          <span className="text-sm text-muted px-1 text-center" aria-live="polite">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="outline"
            disabled={page === totalPages}
            onClick={() => setPage(page + 1)}
            className="rounded-xl min-w-[96px]"
            aria-label="Next page"
          >
            Next
          </Button>
        </div>
      )}

      {/* ── Confirmation dialog ──────────────────────────────────────────────── */}
      <AlertDialog open={confirmOpen} onOpenChange={setConfirmOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>{confirmLabel} {selectedIds.size} user{selectedIds.size > 1 ? 's' : ''}?</AlertDialogTitle>
            <AlertDialogDescription>{confirmDescription}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={executeBulkAction}>{confirmLabel}</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
