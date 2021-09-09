class AnalyticsController < ApplicationController
  def create
    a = Analytic.create!(create_params)
    render json: a
  end

  private

  def create_params
    params.permit(:device_id, :url, :event, :extra, :load_time, :exit_time, :time_spent)
  end
end
