import { Route, Routes } from 'react-router-dom';

import { About } from '@/components/about/About.component.tsx';
import { LayoutComponent } from '@/components/LayoutComponent/LayoutComponent.tsx';
import { ProductDetail } from '@/components/productDetail/ProductDetail.component.tsx';
import { ProductWrapper } from '@/components/productWrapper/productWrapper.component.tsx';

function App() {
    return (
        <Routes>
            <Route path={'/'} element={<LayoutComponent />}>
                <Route index element={<About />} />
                <Route path={'products'} element={<ProductWrapper />} />
                <Route path={'products/:id'} element={<ProductDetail />} />
            </Route>
        </Routes>
    );
}

export default App;
