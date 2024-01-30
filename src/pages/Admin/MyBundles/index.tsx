import { Table, TableBody, TableColumn, TableHeader } from '@nextui-org/react';
import React from 'react';
const MyBundles: React.FC = () => {
  return (
    <div className="flex flex-col h-auto justify-center mx-auto my-0 max-w-5xl px-8 w-[100%] mt-14 bg-white p-8">
      <h1>My Bundles</h1>

      <Table isStriped aria-label="Example empty table" className="mt-10">
        <TableHeader>
          <TableColumn>NAME</TableColumn>
          <TableColumn>REMAINING CREATIONS</TableColumn>
          <TableColumn>ACTIVE</TableColumn>
          <TableColumn>SPONSORED</TableColumn>
          <TableColumn>DATE PROCESSED</TableColumn>
        </TableHeader>
        <TableBody emptyContent={'No bundles found'}>{[]}</TableBody>
      </Table>
    </div>
  );
};

export default MyBundles;
