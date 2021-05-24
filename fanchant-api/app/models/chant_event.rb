class ChantEvent < ApplicationRecord
  belongs_to :chant

  enum state: %i[waiting in_progress finished]

  def check_and_update_state
    seconds_since_start = ((DateTime.now - scheduled_for.to_datetime) * 24 * 60 * 60).to_i

    # seconds elapsed is less than the chant length
    in_progress! if seconds_since_start.positive? && seconds_since_start < chant.timelapse

    # is over when seconds is greater than chant length
    finished! if seconds_since_start > chant.timelapse
  end
end
