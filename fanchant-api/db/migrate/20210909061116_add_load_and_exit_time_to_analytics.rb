class AddLoadAndExitTimeToAnalytics < ActiveRecord::Migration[5.2]
  def change
    add_column :analytics, :load_time, :integer, default: 0
    add_column :analytics, :exit_time, :integer, default: 0
    add_column :analytics, :time_spent, :integer, default: 0
  end
end
