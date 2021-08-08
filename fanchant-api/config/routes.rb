Rails.application.routes.draw do
  mount Rswag::Ui::Engine => '/api-docs'
  mount Rswag::Api::Engine => '/api-docs'
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  # ###### #
  # Chants #
  # ###### #
  post '/chants' => 'chant#create'
  get '/chants' => 'chant#index'
  get '/chants/:id' => 'chant#show'

  # ##### ###### #
  # Chant Events #
  # ##### ###### #
  post '/events' => 'chant_event#create'
  get '/events/stop' => 'chant_event#end_event'
  get '/events/next' => 'chant_event#next'

  get '/events' => 'chant_event#index'
  get '/events/:id/nextLine' => 'chant_event#next_line'
  get '/events/next_dummy' => 'chant_event#next_dummy'
  delete '/events/:id' => 'chant_event#delete'
end
