class AddStateToChantEvent < ActiveRecord::Migration[5.2]
  def change
    add_column :chant_events, :state, :integer, default: 0
  end
end
