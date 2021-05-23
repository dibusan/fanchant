class ChantEventController < ApplicationController
  def create
    chant = Chant.find(params[:chantId])
    chant.chant_events.create!(create_event_params)

    render json: ordered_future_events
  end

  def index
    events = if params[:future] == 'true'
               ChantEvent.where('scheduled_for > ?', DateTime.now)
             else
               ChantEvent.all
             end
    render json: events.order('scheduled_for ASC')
  end

  def next
    render json: ChantEvent.where('scheduled_for >= ?', DateTime.now).order('scheduled_for ASC').limit(1).last
  end

  def delete
    ChantEvent.find(params[:id]).destroy!
    render json: ordered_future_events
  end

  private

  def create_event_params
    params.permit(:scheduled_for)
  end

  def ordered_future_events
    ChantEvent.where('scheduled_for > ?', DateTime.now).order('scheduled_for ASC')
  end
end

