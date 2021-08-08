class ChantEvent < ApplicationRecord
  belongs_to :chant
  validate :event_already_running, on: :create

  enum state: %i[waiting in_progress finished]

  def check_and_update_state
    seconds_since_start = ((DateTime.now - scheduled_for.to_datetime) * 24 * 60 * 60).to_i

    # seconds elapsed is less than the chant length
    in_progress! if seconds_since_start.positive? && seconds_since_start < chant.timelapse

    # is over when seconds is greater than chant length
    finished! if seconds_since_start > chant.timelapse
  end

  def event_already_running
    in_progress_count = ChantEvent.where(state: ChantEvent.states[:in_progress]).count
    errors.add(:base, 'a chant is already in progress') if in_progress_count.positive?
  end

  def increase_next_line!
    self.next_line += 1
    save!
  end
end
