'use client';
import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import TransactionsDataTable from '../_components/TransactionsDataTable';

const TransactionsPage = () => {
    return (
        <Suspense fallback={<div>Loading transactions...</div>}>
            <div className="flex flex-row w-full justify-around lg:gap-4 lg:px-8">
                <TransactionsDataTable itemsPerPage={10} />
            </div>
        </Suspense>
    );
};

export default TransactionsPage;
