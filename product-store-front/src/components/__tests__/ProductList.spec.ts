import { productList } from './../../services/ProductService';
import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import ProductList from '../productList.vue'

 describe('ProductList', () => {
  it('renders properly', () => {    
    const wrapper = mount(ProductList, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
