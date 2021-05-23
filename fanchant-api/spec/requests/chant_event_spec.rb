require 'swagger_helper'

RSpec.describe 'chant_event', type: :request do
  path '/events' do
    post 'Create an event' do
      tags 'Chant Events'
      consumes 'application/json'

      parameter name: :blog, in: :body, schema: {
        type: :object,
        properties: {
          scheduled_for: {
            type: :string,
            example: '2018-03-20T09:12:28Z'
          },
          chantId: { type: :integer }
        },
        required: %w[scheduled_for chant]
      }

      response '201', 'chant event created' do
        run_test!
      end
    end

    get 'Get all events' do
      tags 'Chant Events'
      consumes 'application/json'

      parameter name: :future, in: :query, type: :boolean

      response '200', 'get scheduled all events' do
        run_test!
      end
    end
  end

  path '/events/next' do
    get 'Get the next event that has been scheduled' do
      tags 'Chant Events'
      consumes 'application/json'

      response '200', 'get the immediate next event' do
        run_test!
      end
    end
  end

  path '/events/{id}' do
    delete 'Delete an event using its unique id' do
      tags 'Chant Events'
      consumes 'application/json'

      parameter name: :id, in: :path, type: :string

      response '204', 'delete an event' do
        run_test!
      end
    end
  end
end
