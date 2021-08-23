require 'swagger_helper'

RSpec.describe 'chant', type: :request do

  path '/chants' do

    post 'Creates a chant' do
      tags 'Chants'
      consumes 'application/json'

      parameter name: :blog, in: :body, schema: {
        type: :object,
        properties: {
          title: { type: :string },
          content: { type: :string },
          length: { type: :integer }
        },
        required: %w[title content length]
      }

      response '201', 'chant created' do
        run_test!
      end
    end

    get 'Get all chants' do
      tags 'Chants'
      consumes 'application/json'

      response '200', 'display all chants' do
        run_test!
      end
    end
  end

  path '/chants/{id}' do
    get 'Get a chant using its unique id' do
      tags 'Chants'
      consumes 'application/json'

      parameter name: :id, in: :path, type: :string

      response '200', 'get a chant using its unique id' do
        run_test!
      end
    end
  end
end
