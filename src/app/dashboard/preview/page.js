'use client';

import React, { Suspense } from 'react';
import PreviewForm from '../_components/PreviewForm';

const PreviewPage = () => {
    return (
        <Suspense fallback={<div>Loading preview...</div>}>
            <div className="flex w-full">
                <PreviewForm />
            </div>
        </Suspense>
    );
};

export default PreviewPage;
