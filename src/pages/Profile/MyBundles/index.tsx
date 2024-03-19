import { Table, TableBody, TableCell, TableColumn, TableHeader, TableRow } from '@nextui-org/react';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../core/hooks/storeHooks';
import { getUserBundlesAction } from '../../../core/store/users/usersActions';
import Pagination from '../../../shared/components/Pagination';
import PrimaryButton from '../../../shared/components/PrimaryButton';
const MyBundles: React.FC = () => {
  const userBundles = useAppSelector((c) => c.users.userBundles);
  const dispatch = useAppDispatch();
  const [page, setPage] = useState(1);
  const topLimit = 15;
  const filter = `$orderby=CreatedDate desc,RemainingPositions desc&$top=${topLimit}&$skip=${(page - 1) * topLimit}&$count=true`;
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(getUserBundlesAction(filter));
  }, [page]);

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
      label: 'Purchased Date'
    }
  ];

  return (
    <div className="flex flex-col h-auto justify-center mx-auto my-0 max-w-7xl px-8 w-[100%] mt-14">
      <div className="flex flex-col w-fit">
        <h1 className="text-[#415A77] font-semibold">My Bundles</h1>
        <span className="self-end text-[#6787AD]">Track Your Purchases</span>
      </div>
      <div className="flex justify-end">
        <PrimaryButton onClick={() => navigate('/prices')}>Get More Bundles</PrimaryButton>
      </div>
      <Table classNames={{ wrapper: ['p-1'] }} className="mt-2">
        <TableHeader>
          {columns.map((column) => (
            <TableColumn className="bg-[#415A77] text-white text-xl p-6 h-32" key={column.key}>
              {column.label}
            </TableColumn>
          ))}
        </TableHeader>
        <TableBody emptyContent={'No bundles found'}>
          {userBundles! &&
            userBundles!.items.map((row) => (
              <TableRow key={row.id}>
                <TableCell className="px-6 py-4 text-lg ">{row.name}</TableCell>
                <TableCell className="px-6 py-4 text-lg ">{row.remainingPositions}</TableCell>
                <TableCell className="px-6 py-4 text-lg ">{row.remainingPositions > 0 ? 'YES' : 'NO'}</TableCell>
                <TableCell className="px-6 py-4 text-lg ">{row.sponsored ? 'YES' : 'NO'}</TableCell>
                <TableCell className="px-6 py-4 text-lg ">{moment(row.createdDate).format('DD-MM-yyyy HH:mm')}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
      <div className="flex w-full justify-center mt-10">
        {userBundles && (
          <Pagination
            page={page}
            total={userBundles.total}
            topLimit={topLimit}
            onChange={(page) => {
              setPage(page);
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
          />
        )}
      </div>
    </div>
  );
};

export default MyBundles;
