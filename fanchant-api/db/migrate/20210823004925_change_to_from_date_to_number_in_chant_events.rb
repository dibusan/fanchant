class ChangeToFromDateToNumberInChantEvents < ActiveRecord::Migration[5.2]
  def change
    remove_column :chant_events, :scheduled_for
    add_column :chant_events, :scheduled_for, :integer
  end
end
