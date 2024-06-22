import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import { About } from '@/components/about/About.component.tsx';
import { LayoutComponent } from '@/components/LayoutComponent/LayoutComponent.tsx';
import { ProductDetail } from '@/components/productDetail/ProductDetail.component.tsx';
import { ProductWrapper } from '@/components/productWrapper/ProductWrapper.component.tsx';
import { NotFoundPage } from '@/pages/notFoundPage/NotFoundPage.tsx';

import 'react-toastify/dist/ReactToastify.css';

function App() {
    return (
        <>
            <Routes>
                <Route path={'/'} element={<LayoutComponent />}>
                    <Route index element={<About />} />
                    <Route path={'products'} element={<ProductWrapper />} />
                    <Route path={'products/:id'} element={<ProductDetail />} />
                    <Route path={'*'} element={<NotFoundPage />} />
                    <Route path={'not-found'} element={<NotFoundPage />} />
                </Route>
            </Routes>
            <ToastContainer />
        </>
    );
}

export default App;
