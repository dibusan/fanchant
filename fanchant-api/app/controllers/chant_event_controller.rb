class ChantEventController < ApplicationController
  def create
    chant = Chant.find(params[:chant])
    render json: chant.chant_events.create!(create_event_params)
  end

  def next
    render json: ChantEvent.where('scheduled_for >= ?', DateTime.now).order('scheduled_for ASC').limit(1).last
  end

  def delete
    ChantEvent.find(params[:id]).destroy!
  end

  private

  def create_event_params
    params.permit(:scheduled_for)
  end
end
