class AddNextLineToEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :chant_events, :next_line, :integer, default: 0
  end
end
