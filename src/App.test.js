import React from 'react'
import { mount } from 'enzyme'
import App from './App'
jest.mock('./services/blogs')
import blogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
      beforeEach(() => {
        app = mount(<App />)
      })

      it('no blogs are rendered', () => {
        app.update()

        blogService.getAll().then(blogs => {

            console.log(blogs)

            expect(app.text()).not.toContain(blogs[0].title)
            expect(app.text()).not.toContain(blogs[1].author)
            expect(app.text()).not.toContain(blogs[2].url)
        })
      })
    })

    describe('when user is logged', () => {
      beforeEach(() => {
        const user = {
            username: 'tester',
            token: '3115352',
            name: 'Teuvo Testaaja'
          }

          localStorage.setItem('loggedInUser', JSON.stringify(user))

          app = mount(<App />)
      })

      it('all notes are rendered', () => {
        app.update()

        blogService.getAll().then(blogs => {

            console.log(blogs)

            expect(app.text()).toContain(blogs[0].title)
            expect(app.text()).toContain(blogs[1].author)
            expect(app.text()).toContain(blogs[2].url)
        })
      })
    })
  })