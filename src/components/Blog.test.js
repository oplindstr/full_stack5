import React from 'react'
import { shallow, mount } from 'enzyme'
import Blog from './Blog'

describe.only('<Blog />', () => {
    it('only after clicking name the details are displayed', () => {
      const blog = {
        id: 'id',
        title: 'Blogi',
        author: 'Tekijä',
        url: 'Urli',
        likes: 5
      }

      const addLike = () => {
        return 1
      }

      const destroy = () => {
        return 1
      }
  
      const blogComponent = mount(<Blog blog={blog} addLike={addLike} destroy={destroy} />)
      var toggleVisibleButton = blogComponent.find('.toggleVisibleButton')
      var toggleVisibleContent = blogComponent.find('.toggleVisibleContent')      

      const button = blogComponent.find('.button')
  
      expect(toggleVisibleButton.text()).toContain(blog.title)
      expect(toggleVisibleButton.text()).toContain(blog.author)
      expect(toggleVisibleButton.getElement().props.style).toEqual({ display: '' })
      expect(toggleVisibleContent.getElement().props.style).toEqual({ display: 'none' })

      button.simulate('click')

      toggleVisibleButton = blogComponent.find('.toggleVisibleButton')
      toggleVisibleContent = blogComponent.find('.toggleVisibleContent')     

      expect(toggleVisibleContent.text()).toContain(blog.title)
      expect(toggleVisibleContent.text()).toContain(blog.author)
      expect(toggleVisibleContent.text()).toContain(blog.url)
      expect(toggleVisibleContent.text()).toContain(blog.likes)
      expect(toggleVisibleButton.getElement().props.style).toEqual({ display: 'none' })
      expect(toggleVisibleContent.getElement().props.style).toEqual({ display: '' })

    })
  })