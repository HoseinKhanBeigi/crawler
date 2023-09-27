import React from 'react';
import Layout from '../../components/AdminLayout/AdminLayout';
import ProductSetting from './productSetting';

const title = 'تنظیمات محصول';

async function productSettingPage() {
  return {
    chunks: ['product-setting'],
    title,
    component: (
      <Layout>
        <ProductSetting />
      </Layout>
    ),
  };
}

export default productSettingPage;
