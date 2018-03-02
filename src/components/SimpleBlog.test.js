import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  it('renders title author and likes', () => {
    const blog = {
      title: 'Blogi',
      author: 'Tekijä',
      likes: 5
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} />)
    const contentDiv = blogComponent.find('.content')

    expect(contentDiv.text()).toContain(blog.title)
    expect(contentDiv.text()).toContain(blog.author)
    expect(contentDiv.text()).toContain(blog.likes)
  })

  it('clicking the button twice calls event handler twice', () => {
    const blog = {
        title: 'Blogi',
        author: 'Tekijä',
        likes: 5
      }
  
    const mockHandler = jest.fn()
  
    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={mockHandler} />)
  
    const button = blogComponent.find('button')
    button.simulate('click')
    button.simulate('click')
  
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})