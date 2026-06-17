'use client';

import React, { useState, useEffect } from 'react';
import { Search, MoreVertical, Shield, UserX, UserCheck } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
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
import { useDebounce } from '@/hooks/use-debounce';

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: 'active' | 'suspended';
  joined: string;
}

export default function AdminUserTable() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const debouncedSearch = useDebounce(search, 500);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

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

  const toggleUserStatus = async (id: string, currentStatus: string) => {
    const newStatus = currentStatus === 'active' ? 'suspended' : 'active';
    setUsers(prev => prev.map(u => u.id === id ? { ...u, status: newStatus as any } : u));
    // Real API call here
  };

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

      {/* ── Desktop table (md+) ──────────────────────────────────────────────── */}
      {/*
        FIX 1: Wrap in a div with overflow-x-auto so the fixed-width table scrolls
                horizontally rather than overflowing the card on any viewport.
        FIX 2: Table gets min-w-[720px] so columns never collapse below usable width.
        FIX 3: TableHead cells get whitespace-nowrap so headers never wrap mid-word.
      */}
      <div className="hidden md:block w-full overflow-x-auto">
        <Table className="min-w-[720px] w-full">
          <TableHeader>
            <TableRow className="bg-cream/30 hover:bg-cream/30">
              <TableHead className="w-[220px] py-4 whitespace-nowrap">User</TableHead>
              <TableHead className="whitespace-nowrap">Role</TableHead>
              <TableHead className="whitespace-nowrap">Status</TableHead>
              <TableHead className="text-right whitespace-nowrap">Joined</TableHead>
              <TableHead className="w-[50px]" aria-label="Actions" />
            </TableRow>
          </TableHeader>

          <TableBody>
            {loading ? (
              /* FIX 4: Skeleton rows are proper <tr>/<td> so table layout stays valid */
              [...Array(5)].map((_, i) => (
                <TableRow key={i}>
                  {[...Array(5)].map((_, j) => (
                    <TableCell key={j} className="py-5">
                      <div className="h-4 bg-gray-100 rounded animate-pulse" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : users.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="py-12 text-center text-muted">
                  No users found.
                </TableCell>
              </TableRow>
            ) : (
              users.map((user) => (
                <TableRow key={user.id} className="hover:bg-cream/10">
                  <TableCell>
                    {/* FIX 5: Constrain name/email so long strings don't blow out the column */}
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
      {/*
        FIX 6: Added py-4 so cards don't sit flush against the search bar border.
        FIX 7: Skeleton card count matches desktop (5) for a consistent loading feel.
        FIX 8: Card skeletons use consistent rounded-2xl (not rounded-3xl) to match
                the real cards below them.
      */}
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
              className="rounded-2xl border border-terra/10 bg-white p-4 shadow-sm"
            >
              <div className="flex items-start justify-between gap-3">
                {/* FIX 9: min-w-0 + overflow-hidden ensure long emails/names never
                          push the action button off-screen on narrow phones */}
                <div className="min-w-0 overflow-hidden">
                  <p className="font-semibold text-earth truncate">{user.name}</p>
                  <p className="text-xs text-muted truncate">{user.email}</p>
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
      {/*
        FIX 10: Buttons get min-w-[96px] so "Previous" / "Next" labels never wrap
                 or get clipped on very narrow viewports.
                 Page indicator is allowed to shrink between the two buttons.
      */}
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
    </div>
  );
}