class ChantEventController < ApplicationController
  def create
    chant = Chant.find(params[:chantId])
    event = chant.chant_events.create!(scheduled_for: ((Time.now + 5.seconds).to_f * 1000).to_i)
    event.in_progress!

    render json: event
  end

  def next_line
    event = ChantEvent.find(params[:id])
    event.increase_next_line!
    render json: event
  end

  def end_event
    event = ChantEvent.where(state: ChantEvent.states[:in_progress]).last
    event&.finished!
    render json: event
  end

  def index
    render json: ChantEvent.where(state: ChantEvent.states[:in_progress]).first
  end

  def next
    ev = ChantEvent.where(state: ChantEvent.states[:in_progress]).first
    ev.finished! if ev && ((Time.now - 3.seconds).to_f * 1000).to_i > (ev.scheduled_for + ev.chant.length)
    render json: ev
  end

  def next_dummy
    render json: ChantEvent.new(id: 999, chant_id: 3, state: 1)
  end

  def delete
    ChantEvent.find(params[:id]).destroy!
  end

  private

  def create_event_params
    params.permit(:scheduled_for)
  end

  def ordered_future_events
    ChantEvent.where(
      'scheduled_for > ?', DateTime.now
    ).or(
      ChantEvent.where(state: ChantEvent.in_progress)
    ).order('scheduled_for ASC')
  end
end

