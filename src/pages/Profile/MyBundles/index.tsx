import { Pagination, Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import { getUserBundlesAction } from '../../../store/users/usersActions';
const MyBundles: React.FC = () => {
  const userBundles = useAppSelector((c) => c.users.userBundles);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);

  useEffect(() => {
    dispatch(getUserBundlesAction());
  }, []);

  const columns = [
    {
      key: 'name',
      label: 'NAME'
    },
    {
      key: 'remainingPositions',
      label: 'REMAINING CREATIONS'
    },
    {
      key: 'valid',
      label: 'VALID'
    },
    {
      key: 'sponsored',
      label: 'SPONSORED'
    },
    {
      key: 'createdDate',
      label: 'DATE PROCESSED'
    }
  ];

  return (
    <div className="flex flex-col h-auto justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14 bg-white p-8">
      <h1>My Bundles</h1>

      <Table
        bottomContent={
          <div className="flex w-full justify-center">
            <Pagination
              isCompact
              showControls
              showShadow
              color="primary"
              page={page}
              total={userBundles.length}
              onChange={(page) => setPage(page)}
            />
          </div>
        }
        className="mt-10"
      >
        <TableHeader>
          {columns.map((column) => (
            <TableColumn key={column.key}>{column.label}</TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={'No bundles found'}>
          {userBundles.map((row) => (
            <TableRow key={row.id}>
              <TableCell>{row.name}</TableCell>
              <TableCell>{row.remainingPositions}</TableCell>
              <TableCell>{row.remainingPositions > 0 ? 'YES' : 'NO'}</TableCell>
              <TableCell>{row.sponsored ? 'YES' : 'NO'}</TableCell>

              <TableCell>{moment(row.createdDate).format('DD-MM-yyyy HH:mm')}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default MyBundles;
